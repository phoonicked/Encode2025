// src/components/AgentsDashboard.tsx
import { useState } from "react";
import { Search, PlusCircle, BarChart2, Bot, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the path if needed
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the ScrollArea component
import logo from "./assets/logo.svg";

export default function AgentsDashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  // Listen to real-time updates from the "agents" collection
  useState(() => {
    const agentsRef = collection(db, "agents");
    const unsubscribe = onSnapshot(
      agentsRef,
      (snapshot) => {
        const agentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgents(agentsData);
      },
      (error) => {
        console.error("Error fetching agents:", error);
      }
    );
    return () => unsubscribe();
  });

  // Optionally filter the agent list based on searchTerm
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-300 overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 border-r border-gray-800 p-4 flex flex-col justify-between bg-[rgb(39,39,42)]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="w-12 h-auto object-contain" />
            <h3
              className="text-3xl font-bold text-purple-300 pt-4"
              style={{ fontFamily: "kugile" }}
            >
              IRIS
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-2 text-white transition-colors duration-300 hover:text-purple-300 cursor-pointer">
              <Bot size={18} />
              <span>Agents</span>
            </div>
            <div className="flex items-center gap-2 p-2 text-white transition-colors duration-300 hover:text-purple-300 cursor-pointer">
              <BarChart2 size={18} />
              <span>Stats</span>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-2 opacity-70 cursor-pointer">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg mb-8 text-purple-300"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 relative">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search for Agents here"
            className="w-full py-2 px-4 pr-10 rounded-lg bg-zinc-800 text-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-500"
            size={20}
          />
        </div>

        {/* Agents Grid with ScrollArea */}
        <ScrollArea className="flex-1 h-[calc(100vh-160px)]">
          <div className="grid grid-cols-2 gap-6 pb-20">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                onDoubleClick={() => navigate(`/flowpage/${agent.id}`)}
                className="bg-zinc-800 rounded-lg p-4 bg-[rgb(39,39,42)] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    <span className="text-purple-300 hover:underline">
                      {agent.name}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-700 rounded-full">
                    <PlayCircle size={24} className="text-purple-300" />
                  </button>
                </div>
                <div className="text-sm opacity-70">
                  Agent purpose: {agent.description}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Create New Button */}
        <div className="absolute bottom-6 right-6">
          <button
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/flowpage")}
          >
            <PlusCircle size={18} />
            <span>Create New</span>
          </button>
        </div>
      </div>
    </div>
  );
}
