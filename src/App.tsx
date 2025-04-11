// src/App.tsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WormholeScreen from './WormholeScreen';
import { FlowPage } from './flowpage'; // Adjust the path as needed
import { Button } from "./components/ui/button";

function App() {
  const [showWormhole, setShowWormhole] = useState<boolean>(false);
  const [showFlowPage, setShowFlowPage] = useState<boolean>(false);
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

  // If FlowPage is active, render it with a Back button
  if (showFlowPage) {
    return (
      <div className="App">
        <header>
          <Button onClick={() => setShowFlowPage(false)}>Back</Button>
        </header>
        <FlowPage />
      </div>
    );
  }
  
  // If WormholeScreen is active, render it with a Back button
  if (showWormhole) {
    return (
      <div className="App">
        <header>
          <Button onClick={() => setShowWormhole(false)}>Back</Button>
        </header>
        <WormholeScreen />
      </div>
    );
  }

  // Main App content when no sub-page is active
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
        {/* Button to navigate to WormholeScreen */}
        <Button onClick={() => setShowWormhole(true)}>
          Go to Wormhole Connect
        </Button>
        {/* Button to navigate to FlowPage */}
        <Button onClick={() => setShowFlowPage(true)}>
          Go to Flow Page
        </Button>
        {walletAddress ? (
          <p>Connected Wallet: {walletAddress}</p>
        ) : (
          <>
            <Button onClick={connectWalletDirectly}>Connect Wallet Directly</Button>
          </>
        )}
      </header>
      <div className="card">
        <Button onClick={() => setCount(count + 1)}>
          count is {count}
        </Button>
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
