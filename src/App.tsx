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
import ZoraMint from "./ZoraMint";
import { Button } from "./components/ui/button";
import AgentsDashboard from "./Dashboard";
import { ReactFlowProvider } from "@xyflow/react";
import DeformCanvas from "./components/DeformCanvas";

// Example icons (Heroicons, Lucide, or your own)
function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 448 512"
    >
      <path d="M224 352c53 0 96-43 96-96V96c0-53-43-96-96-96s-96 43-96 96v160c0 53 43 96 96 96zm48-96V96c0-26.5-21.5-48-48-48s-48 21.5-48 48v160c0 26.5 21.5 48 48 48s48-21.5 48-48zM368 192c-8.8 0-16 7.2-16 16 0 79.5-64.5 144-144 144s-144-64.5-144-144c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 94.3 69 172.2 160 183.2V432h-56c-13.3 0-24 10.7-24 24s10.7 24 24 24h160c13.3 0 24-10.7 24-24s-10.7-24-24-24h-56v-56.8c91-11 160-88.9 160-183.2 0-8.8-7.2-16-16-16z" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5V6a2 2 0 00-2-2H5A2 2 0 003 6v12a2 2 0 002 2h14a2 2 0 002-2v-1.5M7 10.5h10a2 2 0 010 4H7a2 2 0 010-4z"
      />
    </svg>
  );
}

function HomeScreen({
  walletAddress,
  connectWalletDirectly,
}: {
  walletAddress: string;
  connectWalletDirectly: () => void;
}) {
  const navigate = useNavigate();

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
              className="bg-transparent flex-1 focus:outline-none text-white placeholder-gray-400 w-2.5"
            />
          </div>

          {/* Dashboard & Connect Wallet Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="default"
              className="w-1/2 flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={() => navigate("/agents")}
            >
              <DashboardIcon />
              Dashboard
            </Button>
            <Button
              variant="default"
              className="w-1/2 flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={connectWalletDirectly}
            >
              <WalletIcon />
              {walletAddress ? "Connected" : "Connect Wallet"}
            </Button>
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

// Wrapper for ZoraMint with a Back button
function ZoraMintWrapper({ walletAddress }: { walletAddress: string }) {
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
      <ZoraMint walletAddress={walletAddress} />
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

// Main App component
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
        <Route
          path="/mint"
          element={<ZoraMintWrapper walletAddress={walletAddress} />}
        />
        <Route path="/agents" element={<AgentsDashboardWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;