from agent_runner.concretizer.parser import *
from agent_runner.nodes import *

__switcher = {
    "ai/openai": OpenAINode,
    "input/text": InputText,
    "output/text": OutputText,
    "output/nft": OutputNFT,
}

def __create_node(node_info: NodeInfo):
    """
    Creates a node based on the provided node information.
    """
    node = __switcher.get(node_info.node_type)
    if node:
        return node(node_info.node_id, node_info.options)
    else:
        raise ValueError(f"Unknown node type: {node_info.node_type}")

def agent_resolve(agent: AgentInfo) -> dict[int, Node]:
    """
    Resolves the agent by creating a linked tree of nodes based on the provided agent information.
    """
    nodes: dict[int, Node] = {}
    for node_info in agent.nodes:
        new_node = __create_node(node_info)
        nodes[new_node.id] = new_node    

    for conn in agent.connections:
        nodes[conn.to_node].inputs.append(conn.from_node)

    return nodes