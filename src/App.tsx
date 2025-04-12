// App.tsx
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import WormholeScreen from "./WormholeScreen";
import Cart from "./cart";
import { FlowPage } from "./flowpage";
import { handleMint } from "./minter";
import { Button } from "./components/ui/button";
import AgentsDashboard from "./Dashboard";
import { ReactFlowProvider } from "@xyflow/react";
import DeformCanvas from "./components/DeformCanvas";
import { Globe, LayoutDashboard, Wallet } from "lucide-react";
import Marketplace from "./marketplace";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import Logo from "./assets/logo.svg"; // Import the logo SVG file

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

      {/* Logo and Text */}
      <div className="absolute top-1/6 left-0 right-0 flex flex-col items-center justify-center pointer-events-none">
        <img
          src={Logo}
          alt="Logo"
          className="w-1/3 max-w-lg opacity-40"
        />
        <h1 className="absolute text-9xl font-extrabold text-white opacity-90 mt-30" style={{ fontFamily: "kugile" }}>
          IRIS
        </h1>
      </div>

      {/* Panel in the top right */}
      <div className="absolute top-4 right-4 flex flex-col items-center gap-2">
        {walletAddress && (
          <div className="bg-zinc-800 p-4 rounded-lg shadow-lg">
            {/* Connection Status Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Connected</span>
            </div>
            {/* Wallet Address */}
            <div className="text-xs text-gray-400 text-center break-all">
              {walletAddress}
            </div>
          </div>
        )}
        {!walletAddress && (
          <div className="relative group">
            <Button
              variant="default"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full"
              onClick={connectWalletDirectly}
            >
              <Wallet />
              Connect Wallet
            </Button>
          </div>
        )}
      </div>

      {/* Floating Island */}
      <div className="absolute top-[55%] left-0 right-0 flex items-center justify-center px-4">
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
                onClick={() => navigate("/marketplace")}
              >
                <Globe />
                Marketplace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper for FlowPage with a Back button
function FlowPageWrapper() {
  return (
    <div className="min-h-screen">
      <ReactFlowProvider>
        <FlowPage />
      </ReactFlowProvider>
    </div>
  );
}

function MarketplaceWrapper() {
  return (
    <div className="min-h-screen">
      <Marketplace />
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

function CartWrapper() {
  return (
    <div className="min-h-screen">
      <Cart />
    </div>
  )
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
        <Route path="/marketplace" element={<MarketplaceWrapper />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;