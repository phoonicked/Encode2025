// src/App.tsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WormholeScreen from './WormholeScreen';
import { FlowPage } from './flowpage'; // Adjust path as needed
import { Button } from "./components/ui/button";
import ZoraMint from './ZoraMint';

// Home screen component with wallet connection and navigation buttons
function Home({ walletAddress, connectWalletDirectly }: { walletAddress: string, connectWalletDirectly: () => void }) {

  const [count, setCount] = useState<number>(0);

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
        <div className="space-x-2 mt-4">
          {/* Navigation Buttons */}
          <Button>
            <Link to="/wormhole">Go to Wormhole Connect</Link>
          </Button>
          <Button>
            <Link to="/flowpage">Go to Flow Page</Link>
          </Button>
          <Button>
            <Link to="/mint">Linganguliguliguliwacha</Link>
          </Button>
          {/* Wallet Connection */}
          {walletAddress ? (
            <p>Connected Wallet: {walletAddress}</p>
          ) : (
            <Button onClick={connectWalletDirectly}>Connect Wallet Directly</Button>
          )}
        </div>
      </header>
      <div className="card mt-4">
        <Button onClick={() => setCount(count + 1)}>count is {count}</Button>
        <p>Edit <code>src/App.tsx</code> and save to test HMR.</p>
      </div>
      <p className="read-the-docs mt-4">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}

// Wrapper for FlowPage with a Back button
function FlowPageWrapper() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="p-4">
        <Button onClick={() => navigate('/')}>Back</Button>
      </header>
      <FlowPage />
    </div>
  );
}

// Wrapper for WormholeScreen with a Back button
function WormholeWrapper() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="p-4">
        <Button onClick={() => navigate('/')}>Back</Button>
      </header>
      <WormholeScreen />
    </div>
  );
}

// Main App component with router configuration
function App() {

  const [walletAddress, setWalletAddress] = useState<string>('');
  const connectWalletDirectly = async () => {
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          // console.log('Direct wallet connection successful:', accounts[0]);
        }
      } else {
        alert('No Ethereum wallet detected. Please install MetaMask or another supported wallet.');
      }
    } catch (error) {
      console.error('Error connecting wallet directly:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home walletAddress={walletAddress} connectWalletDirectly={connectWalletDirectly}/>} />
        <Route path="/flowpage" element={<FlowPageWrapper />} />
        <Route path="/wormhole" element={<WormholeWrapper />} />
        <Route path="/mint" element={<ZoraMint walletAddress={walletAddress} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
