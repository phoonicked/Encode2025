from agent_runner.concretizer.parser import parse_agent
from agent_runner.concretizer.resolver import agent_resolve

def main():
    # Read /home/cy4/p/js/Encode2025/docs/agent-schema.json as string:
    with open('/home/cy4/p/js/Encode2025/docs/agent-schema.json', 'r') as f:
        agent_schema = f.read()
        info = parse_agent(agent_schema)
        nodes = agent_resolve(info)
        
        for node in nodes.values():
            print(node)
            print(node.requires_keys())