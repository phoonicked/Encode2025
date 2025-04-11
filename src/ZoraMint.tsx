import React, { useState } from 'react';
import { create1155 } from "@zoralabs/protocol-sdk";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from 'viem/chains';

interface Props {
  walletAddress: string;
}

const ZoraMint: React.FC<Props> = ({ walletAddress }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [minting, setMinting] = useState<boolean>(false);
    const [contractAddress, setContractAddress] = useState<string>("");
    const [tokenURI, setTokenURI] = useState<string>("");

  // Configure the public client and wallet client for Base Sepolia.
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom((window as any).ethereum),
  });

   // Check and request network switch if needed.
   const ensureCorrectNetwork = async () => {
    // Get the current chain ID from the wallet.
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
            alert("Failed to add Base Sepolia network to your wallet.");
            return false;
          }
        } else {
          console.error("Chain switch error:", switchError);
          alert("Please switch your wallet network to Sepolia.");
          return false;
        }
      }
    }
    return true;
  };  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadToIPFS = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.PINATA_JWT_KEY}`,
      },
      body: formData,
    });

    const data = await res.json();
    return `ipfs://${data.IpfsHash}`;
  };

  const handleMint = async () => {
    if (!selectedFile || !walletAddress) {
      alert("Please connect your wallet and select a file.");
      return;
    }
    setMinting(true);
    try {
      // Ensure the wallet is on the correct network.
      const isCorrectChain = await ensureCorrectNetwork();
      if (!isCorrectChain) {
        setMinting(false);
        return;
      }

      // 1. Upload the file to IPFS and get the metadata URI.
      const uploadedURI = await uploadToIPFS(selectedFile);
      setTokenURI(uploadedURI);

      // 💾 Define your contract + token metadata
  const contractMetadata = {
    name: "Test Contract",
    description: "A test 1155 contract created via the Zora protocol.",
    image: `${uploadedURI}`,
    external_link: "https://yourprojectsite.xyz",
  };

  const tokenMetadata = {
    name: "My First Token",
    description: "This is the first token in the collection.",
    image: `${uploadedURI}`,
    attributes: [
      { trait_type: "Rarity", value: "Rare" },
      { trait_type: "Level", value: 1 },
    ],
  };

  // Convert JSON to File
const createJsonFile = (obj: any, filename: string): File => {
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    return new File([blob], filename);
  };

  // 📤 Upload both metadata files
  const contractJsonFile = createJsonFile(contractMetadata, "contract.json");
  const tokenJsonFile = createJsonFile(tokenMetadata, "token.json");

  const contractUri = await uploadToIPFS(contractJsonFile);
  const tokenUri = await uploadToIPFS(tokenJsonFile);

  console.log("✅ Uploaded contract.json:", contractUri);
  console.log("✅ Uploaded token.json:", tokenUri);


      // 2. Prepare the 1155 NFT creation using Zora's create1155 function.
      const { parameters, contractAddress } = await create1155({
        contract: {
          name: "My Zora NFT Collection",
          uri: contractUri, // Contract metadata URI
        },
        token: {
          tokenMetadataURI: tokenUri, // Token metadata URI
        },
        account: walletAddress,
        publicClient,
      });

      
      console.log("Contract Address:", contractAddress);
      console.log("Parameters:", parameters);

      // 3. Execute the transaction using the wallet client.
      const tx = await walletClient.writeContract(parameters);
      console.log("Transaction:", tx);
      setContractAddress(contractAddress);

      alert(`NFT successfully minted on contract: ${contractAddress}`);
    } catch (error) {
      console.error("Minting error:", error);
      alert("Minting failed.");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Zora 1155 Minting (Base Sepolia)</h1>

      <input type="file" onChange={handleFileChange} disabled={minting} />
      <br />
      <button onClick={handleMint} disabled={!selectedFile || minting || !walletAddress}>
        {minting ? "Minting..." : "Mint NFT"}
      </button>

      {tokenURI && (
        <p>
          NFT Metadata URI:{" "}
          <a
            href={`https://ipfs.io/ipfs/${tokenURI.split("//")[1]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tokenURI}
          </a>
        </p>
      )}
      {contractAddress && <p>Deployed Contract Address: {contractAddress}</p>}
    </div>
  );
};

export default ZoraMint;