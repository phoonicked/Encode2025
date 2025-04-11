import React from 'react';
import WormholeConnect, {
  WormholeConnectConfig,
  WormholeConnectTheme,
} from '@wormhole-foundation/wormhole-connect';

const WormholeScreen: React.FC = () => {
  const config: WormholeConnectConfig = {
    network: 'Testnet', 
    chains: ['Sui', 'Avalanche'], 
    ui: {
      title: 'SUI Connect TS Demo', 
    },
  };


  const theme: WormholeConnectTheme = {
    mode: 'dark',
    primary: '#78c4b6',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Wormhole Connect - Ethereum Testnet</h1>
      <WormholeConnect config={config} theme={theme} />
    </div>
  );
};

export default WormholeScreen;