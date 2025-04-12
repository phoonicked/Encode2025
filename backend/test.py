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

        async def send_message(message: str):
            await websocket.send_text(json.dumps(message))

        async def await_response():
            response = await websocket.receive_text()
            return json.loads(response)

        with open('/home/cy4/p/js/Encode2025/docs/agent-schema.json', 'r') as f:
            agent_schema = f.read()
            info = parse_agent(agent_schema)
            nodes = agent_resolve(info)
            print(nodes)
            results = await execute(nodes, {"OPENAI_API_KEY": os.getenv("OPENAI_API_KEY")}, params["input_text"], send_message, await_response)
            print("Execution Results:")
            for result in results:
                print(result)

        # Simulate using the params
        
        await websocket.close()

    except WebSocketDisconnect:
        print("Client disconnected")