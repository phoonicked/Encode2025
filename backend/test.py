from agent_runner.concretizer.parser import parse_agent
from agent_runner.concretizer.resolver import agent_resolve
from agent_runner.executor import execute

# Read .env
from dotenv import load_dotenv
import os
load_dotenv()

def main():
    # Read /home/cy4/p/js/Encode2025/docs/agent-schema.json as string:
    with open('/home/cy4/p/js/Encode2025/docs/agent-schema.json', 'r') as f:
        agent_schema = f.read()
        info = parse_agent(agent_schema)
        nodes = agent_resolve(info)
        print(nodes)
        results = execute(nodes, {"OPENAI_API_KEY": os.getenv("OPENAI_API_KEY")}, "Make me a monkey NFT")
        print("Execution Results:")
        for result in results:
            print(result)

if __name__ == "__main__":
    main()