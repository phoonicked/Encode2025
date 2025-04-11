from agent_runner.concretizer.parser import parse_agent
from agent_runner.concretizer.resolver import agent_resolve
from agent_runner.executor import execute

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import json

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


@app.websocket("/ws/run-function")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        # Wait for data from client
        data = await websocket.receive_text()
        params = json.loads(data)
        await websocket.send_text(f"Received parameters: {params}")

        # Simulate using the params
        task_name = params.get("task", "default-task")
        steps = params.get("steps", 5)

        for i in range(steps):
            await asyncio.sleep(1)  # Simulate work
            await websocket.send_text(f"[{task_name}] Step {i + 1}/{steps}")

        await websocket.send_text(f"[{task_name}] Done ✅")
        await websocket.close()

    except WebSocketDisconnect:
        print("Client disconnected")