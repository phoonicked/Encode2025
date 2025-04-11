// src/WormholeScreen.tsx

import React, { useState } from 'react';
import WormholeConnect, {
  WormholeConnectConfig,
  WormholeConnectTheme,
} from '@wormhole-foundation/wormhole-connect';

const WormholeScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [minting, setMinting] = useState<boolean>(false);

  const config: WormholeConnectConfig = {
    network: 'Testnet',
    chains: ['Ethereum', 'Sepolia', 'ArbitrumSepolia', 'BaseSepolia', 'Avalanche', 'Solana', 'Polygon'],
    ui: {
      title: 'Connect TS Demo',
    },
  };

  const theme: WormholeConnectTheme = {
    mode: 'dark',
    primary: '#78c4b6',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleMintAndStore = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setMinting(true);
    try {
      // Placeholder logic - Replace this with actual Talisman minting API call
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Example API call structure
      const response = await fetch('https://api.talisman.network/mint', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Minting failed');
      }

      const result = await response.json();
      console.log('Minted NFT:', result);
      alert(`Successfully minted! Token ID: ${result.tokenId}`);

    } catch (error) {
      console.error('Error minting:', error);
      alert('Minting failed, please try again.');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Wormhole Connect - Ethereum Testnet</h1>
      <WormholeConnect config={config} theme={theme} />

      <div style={{ marginTop: '2rem', borderTop: '1px solid #444', paddingTop: '2rem' }}>
        <h2>Mint & Store on Talisman</h2>

        <input type="file" onChange={handleFileChange} style={{ marginBottom: '1rem' }} />

        <button onClick={handleMintAndStore} disabled={minting}>
          {minting ? 'Minting...' : 'Mint & Store'}
        </button>
      </div>
    </div>
  );
};

export default WormholeScreen;