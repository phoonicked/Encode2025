import json

class NodeInfo:
    def __init__(self, id, type, position, data):
        self.node_id = id
        self.node_type = type
        self.pos = position
        self.options = data
    
    def __repr__(self):
        return f"Node(id={self.node_id}, type={self.node_type}, pos={self.pos}, options={self.options})"

class ConnectionInfo:
    def __init__(self, conn):
        self.from_node = conn["source"]
        self.to_node = conn["target"]
    
    def __repr__(self):
        return f"Connection(from={self.from_node}, to={self.to_node})"

class AgentInfo:
    def __init__(self, name, description, nodes, connections):
        self.name = name
        self.description = description
        self.nodes = [NodeInfo(node["id"], node["type"], node["position"], node["data"]) for node in nodes]
        self.connections = [ConnectionInfo(conn) for conn in connections]
    
    def __repr__(self):
        return f"Agent(name={self.name}, description={self.description}, nodes={self.nodes}, connections={self.connections})"


def parse_agent(agent_json: str) -> AgentInfo | None:
    """
    Parses the agent string and returns an Agent object.
    """
    try:
        parsed_data = json.loads(agent_json)
        agent = AgentInfo(
            name=parsed_data['name'],
            description=parsed_data['description'],
            nodes=parsed_data['nodes'],
            connections=parsed_data['edges']
        )
        return agent
    except json.JSONDecodeError:
        # If parsing fails, return None or raise an exception
        return None