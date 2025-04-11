import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import WormholeScreen from "./WormholeScreen";
import { FlowPage } from "./flowpage"; // Adjust path as needed
import ZoraMint from "./ZoraMint";
import { Button } from "./components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import AgentsDashboard from "./Dashboard";
import { ReactFlowProvider } from "@xyflow/react";
import DeformCanvas from "./components/DeformCanvas";

// Home screen component with navigation bar
function Home({
  walletAddress,
  connectWalletDirectly,
}: {
  walletAddress: string;
  connectWalletDirectly: () => void;
}) {

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center p-4 z-20">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto p-2 bg-white/20 backdrop-blur-md shadow-md rounded-full border border-white/30">
          <div className="flex space-x-2 mr-2">
            <Button asChild variant="outline" className="rounded-full font-medium">
              <Link to="/wormhole">wormhole</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full font-medium">
              <Link to="/flowpage">flow</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full font-medium">
              <Link to="/mint">Linganguliguliguliwacha</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full font-medium">
              <Link to="/agents">Dashboard</Link>
            </Button>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-2 font-medium ml-2 flex items-center"
                  onClick={connectWalletDirectly}
                >
                  {walletAddress ? (
                    <div className="flex items-center">
                      connected
                      <div className="ml-2 relative">
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    "connect wallet"
                  )}
                </Button>
              </TooltipTrigger>
              {walletAddress && (
                <TooltipContent>
                  <p>{walletAddress}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <DeformCanvas />
      <div className="flex justify-center items-center min-h-screen">
        {/* Main content area */}
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
            <Home
              walletAddress={walletAddress}
              connectWalletDirectly={connectWalletDirectly}
            />
          }
        />
        <Route path="/flowpage" element={<FlowPageWrapper />} />
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