// src/WormholeScreen.tsx

import React from 'react';
import { Button } from "./components/ui/button";
import { ethers } from 'ethers';


const Cart: React.FC = () => {
  return (
    <div>
      <Button className="bg-green-500" onClick={() => {
        (async () => {
          const contractAddress = '0xd970240849b20133BBc68CE7F7bEf66dd021Fc73';
          const contractABI = [
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "buyer",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "leaseStart",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "leaseDuration",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
                }
              ],
              "name": "AssetLeased",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "hourlyRate",
                  "type": "uint256"
                }
              ],
              "name": "AssetRegistered",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                }
              ],
              "name": "LeaseEnded",
              "type": "event"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                }
              ],
              "name": "endLease",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "duration",
                  "type": "uint256"
                }
              ],
              "name": "leaseAsset",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "hourlyRate",
                  "type": "uint256"
                }
              ],
              "name": "registerAsset",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "stateMutability": "payable",
              "type": "constructor"
            },
            {
              "stateMutability": "payable",
              "type": "fallback"
            },
            {
              "inputs": [],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "stateMutability": "payable",
              "type": "receive"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "assets",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "hourlyRate",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "assetId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "duration",
                  "type": "uint256"
                }
              ],
              "name": "getLeasePrice",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "leases",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "buyer",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "leaseStart",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaseDuration",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "active",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "pendingWithdrawals",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "SECONDS_PER_HOUR",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ];

          // Ensure ethers is used correctly
          const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers v6
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          // const res = await contract.registerAsset(1, 100000000000000);
          // const res = await contract.getLeasePrice(1, 86400);
          // console.log(res);
        })();
      }}>Checkout</Button>
    </div>
  );
};

export default Cart;