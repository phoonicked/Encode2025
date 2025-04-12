import { WalletClient } from "viem";
import { sepolia } from 'viem/chains';
// Ensure ethers is imported correctly
import { ethers } from 'ethers';

const ensureCorrectNetwork = async (walletClient: WalletClient) => {
  const currentChainId = await walletClient.getChainId();
  if (currentChainId !== sepolia.id) {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xAA36A7" }],
      });
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xAA36A7",
                chainName: "Sepolia Testnet",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xAA36A7" }],
          });
          return true;
        } catch (addError) {
          console.error("Error adding/switching network:", addError);
          alert("Failed to add Sepolia network.");
          return false;
        }
      } else {
        console.error("Chain switch error:", switchError);
        alert("Please switch to the Sepolia network.");
        return false;
      }
    }
  }
  return true;
};

const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT_KEY}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (data && data.IpfsHash) {
    return `ipfs://${data.IpfsHash}`;
  } else {
    throw new Error('IPFS upload failed');
  }
};

const createJsonFile = (obj: any, filename: string): File => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  return new File([blob], filename);
};

export const handleMint = async (addr: string, data: string, walletClient: WalletClient) => {

  try {
    // Ensure the wallet is on the correct network.
    const isCorrectChain = await ensureCorrectNetwork(walletClient);
    if (!isCorrectChain) {
      return;
    }

    // 1. Upload the file to IPFS and get the metadata URI.
    const uploadedURI = await uploadToIPFS(createJsonFile({ data: data }, "nft.json"));

    const tokenMetadata = {
      name: "My First Token",
      description: "This is the first token in the collection.",
      image: uploadedURI,
      attributes: [
        { trait_type: "Rarity", value: "Rare" },
        { trait_type: "Level", value: 1 },
      ],
    };
    

    // 📤 Upload both metadata files
    const tokenJsonFile = createJsonFile(tokenMetadata, "token.json");
    const tokenUri = await uploadToIPFS(tokenJsonFile);

    // Contract details
    const contractAddress = '0x4cbcb03f288f992bc49f8345868281a664c2b449';
    const contractABI = [
      "function mint(address to, string memory tokenURI) public returns (uint256)",
    ];

    // Ensure ethers is used correctly
    const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.mint(addr, tokenUri);
    const txData = await tx.wait();
    console.log('NFT minted successfully!');
    return {
      success: true,
      result: txData.to
    };
  } catch (error) {
    console.error("Minting error:", error);
    alert("Minting failed.");
  } finally {
  }

  return {
    success: false,
    result: null
  };
};
