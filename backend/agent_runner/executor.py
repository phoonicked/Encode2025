from agent_runner.datum import Datum

class CallingCtx:
    def __init__(self, api_keys: dict[str, str]):
        self.api_keys = api_keys

    def key(self, key: str) -> str:
        """
        Retrieves the API key for the given key name.
        """
        return self.api_keys.get(key, None)

def run(node: any, nodes: dict[int, any], context: CallingCtx) -> list[Datum]:
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
        input_data = run(nodes[input_node], nodes, context)
        inputs.append(input_data)

    print("Executed " + str(node) + " with inputs:" + str(inputs))

    # Execute the node
    return node.execute(inputs, context)

def execute(nodes: dict[int, any], api_keys: dict[str, str], inputs: list[str]) -> list[str]:
    """
    Executes the pipeline with the given nodes and connections.
    """
    
    # Find the output nodes
    output_nodes = [node for node in nodes.values() if node.is_output()]

    # Create a context for API keys
    context = CallingCtx(api_keys)

    # Execute the nodes
    results = []
    for node in output_nodes:
        run_result = run(node, nodes, context)
        results.extend(run_result)

    # Convert results to strings for output
    return [str(result) for result in results]