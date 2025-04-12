from agent_runner.datum import Datum

class CallingCtx:
    def __init__(self, api_keys: dict[str, str], input_text: str, send_message, await_response):
        self.api_keys = api_keys
        self.input_text = input_text
        self.send_message = send_message
        self.await_response = await_response

    def key(self, key: str) -> str:
        """
        Retrieves the API key for the given key name.
        """
        return self.api_keys.get(key, None)

async def run(node: any, nodes: dict[int, any], context: CallingCtx) -> list[Datum]:
    """
    Runs the given node with the provided inputs and context.
    """
    # Check if the node requires any API keys
    required_keys = node.requires_keys()
    for key in required_keys:
        if key not in context.api_keys:
            raise ValueError(f"Missing API key: {key}")
        
    # Execute all inputs
    inputs = []
    for input_node in node.inputs:
        input_data = await run(nodes[input_node], nodes, context)
        inputs.extend(input_data)

    print("Executed " + str(node) + " with inputs:" + str(inputs))

    # Execute the node
    return await node.execute(inputs, context)

async def execute(nodes: dict[int, any], api_keys: dict[str, str], text_input: str, send_message, await_response) -> list[str]:
    """
    Executes the pipeline with the given nodes and connections.
    """
    
    # Find the output nodes
    output_nodes = [node for node in nodes.values() if node.is_output()]

    # Create a context for API keys
    context = CallingCtx(api_keys, text_input, send_message, await_response)

    # Execute the nodes
    results = []
    for node in output_nodes:
        run_result = await run(node, nodes, context)
        results.extend(run_result)

    # Convert results to strings for output
    return [str(result) for result in results]