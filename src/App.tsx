// src/App.tsx

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WormholeScreen from './WormholeScreen';

function App() {
  const [showWormhole, setShowWormhole] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  const connectWalletDirectly = async () => {
    try {
      // Check if the Ethereum provider (e.g., MetaMask) is available
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log('Direct wallet connection successful:', accounts[0]);
        }
      } else {
        alert('No Ethereum wallet detected. Please install MetaMask or another supported wallet.');
      }
    } catch (error) {
      console.error('Error connecting wallet directly:', error);
    }
  };

  if (showWormhole) {
    return (
      <div className="App">
        <header>
          <button onClick={() => setShowWormhole(false)}>Back</button>
        </header>
        
        <WormholeScreen />
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <div>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <button onClick={() => setShowWormhole(true)}>
          Go to Wormhole Connect
        </button>
        {walletAddress ? (
            <p>Connected Wallet: {walletAddress}</p>
          ) : (
            <>
              <button onClick={connectWalletDirectly}>Connect Wallet Directly</button>
            </>
          )}
      </header>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}

export default App;