import { useState } from "react";
import { Search, PlusCircle, BarChart2, Bot, Info } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AgentsDashboard() {
  const [agents] = useState([
    { id: 1, name: "Agent Name", purpose: "Blah Blah Blah" },
    { id: 2, name: "Agent Name", purpose: "Blah Blah Blah" },
    { id: 3, name: "Agent Name", purpose: "Blah Blah Blah" },
    { id: 4, name: "Agent Name", purpose: "Blah Blah Blah" },
    { id: 5, name: "Agent Name", purpose: "Blah Blah Blah" },
    { id: 6, name: "Agent Name", purpose: "Blah Blah Blah" },
  ]);

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-300">
      {/* Sidebar */}
      <div className="w-60 border-r border-gray-800 p-4 flex flex-col justify-between bg-[rgb(39,39,42)]">
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-300 cursor-pointer">
              <Bot size={18} />
              <span>Agents</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <BarChart2 size={18} />
              <span>Stats</span>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-2 opacity-70 cursor-pointer">
            <Info size={18} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search for Agents here"
            className="w-full py-2 px-4 pr-10 rounded-lg bg-zinc-800 text-gray-300 focus:outline-none"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-500"
            size={20}
          />
        </div>

        {/* Agents Grid */}
        <div
          className="grid grid-cols-2 gap-6 bg]
        
        "
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-zinc-800 rounded-lg p-4 bg-[rgb(39,39,42)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                  <Link
                    to="/flowpage"
                    className="text-purple-300 hover:underline"
                  >
                    {agent.name}
                  </Link>
                </div>
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <PlayCircle size={24} className="text-purple-300" />
                </button>
              </div>
              <div className="text-sm opacity-70">
                Agent purpose: {agent.purpose}
              </div>
            </div>
          ))}
        </div>

        {/* Create New Button */}
        <div className="absolute bottom-6 right-6">
          <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
            <PlusCircle size={18} />
            <span>Create New</span>
          </button>
        </div>
      </div>
    </div>
  );
}
