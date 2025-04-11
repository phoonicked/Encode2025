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



  return (
    <div style={{ padding: '2rem' }}>
      <h1>Wormhole Connect - Ethereum Testnet</h1>
      <WormholeConnect config={config} theme={theme} />
    </div>
  );
};

export default WormholeScreen;