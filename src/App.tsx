// App.tsx
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import WormholeScreen from "./WormholeScreen";
import { FlowPage } from "./flowpage";
import { handleMint } from "./minter";
import { Button } from "./components/ui/button";
import AgentsDashboard from "./Dashboard";
import { ReactFlowProvider } from "@xyflow/react";
import DeformCanvas from "./components/DeformCanvas";
import { LayoutDashboard, Wallet } from "lucide-react";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";


function HomeScreen({
  walletAddress,
  connectWalletDirectly,
}: {
  walletAddress: string;
  connectWalletDirectly: () => void;
}) {
  const navigate = useNavigate();

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom((window as any).ethereum),
  });

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative">
      {/* Background Canvas */}
      <DeformCanvas />

      {/* Center the entire content */}
      <div className="flex items-center justify-center h-screen px-4">
        {/* Glassmorphic Container for the prompt UI */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl w-full max-w-lg space-y-6">
          {/* Heading */}
          <h1 className="text-center text-3xl md:text-4xl font-semibold">
            What can I help with?
          </h1>

          {/* Prompt / Input Bar */}
          <div className="flex items-center bg-zinc-800 rounded-full shadow px-4 py-2 space-x-2 w-115 h-14">
            {/* Text Input */}
            <input
              type="text"
              placeholder="Ask anything"
              className="bg-transparent flex-1 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Dashboard & Connect Wallet Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="default"
              className="w-1/2 flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={() => navigate("/agents")}
            >
              <LayoutDashboard />
              Dashboard
            </Button>
            {/* Wrap Connect Wallet in a relative container to show tooltip on hover */}
            <div className="relative group w-1/2">
              <Button
                variant="default"
                className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white"
                onClick={connectWalletDirectly}
              >
                <Wallet />
                {walletAddress ? "Connected" : "Connect Wallet"}
              </Button>
              {/* Tooltip displayed on hover if wallet is connected */}
              {walletAddress && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition duration-300">
                  {walletAddress}
                </div>
              )}
            </div>
            <button onClick={() => {
              console.log("Establishing WS conn")
              const socket = new WebSocket('ws://localhost:8000/ws/run-function');

              socket.onopen = () => {
                console.log('WebSocket connected');

                // Send data to the server
                const input = {
                  input_text: "Make me a monkey NFT",
                };
                socket.send(JSON.stringify(input));
              };

              socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                switch (message.type) {
                  case "log":
                    console.log("Log:", message.message);
                    break;
                  case "mint":
                    console.log("Minting NFT...");
                    (async () => {
                      const result = await handleMint(walletAddress, message.data, walletClient);
                      if (result?.success) {
                        console.log("NFT minted successfully:", result.result);
                        socket.send(JSON.stringify({ type: "minted", data: result.result }));
                      } else {
                        console.error("Minting failed");
                        socket.send(JSON.stringify({ type: "error", message: "Minting failed" }));
                      }
                    })();
                    break;
                }
              };

              socket.onclose = () => {
                console.log('WebSocket connection closed');
              };

              socket.onerror = (error) => {
                console.error('WebSocket error', error);
              };
            }}>
              WHAT THE SIGMA?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper for FlowPage with a Back button
function FlowPageWrapper() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <header className="p-4">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </header>
      <ReactFlowProvider>
        <FlowPage />
      </ReactFlowProvider>
    </div>
  );
}

// Wrapper for WormholeScreen with a Back button
function WormholeWrapper() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <header className="p-4">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </header>
      <WormholeScreen />
    </div>
  );
}

// Wrapper for AgentsDashboard
function AgentsDashboardWrapper() {
  return (
    <div className="min-h-screen">
      <AgentsDashboard />
    </div>
  );
}

// Main App component with router configuration
function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const connectWalletDirectly = async () => {
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Direct wallet connection successful:", accounts[0]);
        }
      } else {
        alert(
          "No Ethereum wallet detected. Please install MetaMask or another supported wallet."
        );
      }
    } catch (error) {
      console.error("Error connecting wallet directly:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              walletAddress={walletAddress}
              connectWalletDirectly={connectWalletDirectly}
            />
          }
        />
        <Route path="/flowpage" element={<FlowPageWrapper />} />
        <Route path="/flowpage/:agentId" element={<FlowPageWrapper />} />
        <Route path="/wormhole" element={<WormholeWrapper />} />
        <Route path="/agents" element={<AgentsDashboardWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;