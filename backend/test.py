from agent_runner.concretizer.parser import parse_agent
from agent_runner.concretizer.resolver import agent_resolve
from agent_runner.executor import execute

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio

# Read .env
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI()

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


@app.websocket("/ws/run-agent")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        # Optional: Wait for a start signal from the client
        await websocket.send_text("Function starting...")

        for i in range(5):  # Simulate work
            await asyncio.sleep(1)
            await websocket.send_text(f"Step {i + 1}/5 complete")

        await websocket.send_text("Function finished successfully.")
        await websocket.close()
    except WebSocketDisconnect:
        print("Client disconnected")