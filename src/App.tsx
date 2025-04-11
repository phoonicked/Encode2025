import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WormholeScreen from './WormholeScreen';

function App() {
  const [count, setCount] = useState(0);
  const [showWormhole, setShowWormhole] = useState(false);

  // Toggle between original screen and Wormhole screen
  const toggleScreen = () => {
    setShowWormhole((prev) => !prev);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={toggleScreen}>
        {showWormhole ? 'Show Counter' : 'Show Wormhole Connect'}
      </button>
      
      {showWormhole ? (
        // Render the Wormhole Screen when toggled on
        <WormholeScreen />
      ) : (
        // Original Counter / Info UI
        <>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )}
    </div>
  );
}

export default App;