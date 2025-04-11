class Node:
    def __init__(self, id: int):
        self.id: int = id
        self.inputs: list[Node] = []

    def __repr__(self):
        return f"Node({self.id})"

    def requires_keys(self) -> list[str]:
        return []

class OpenAI(Node):
    def requires_keys(self) -> list[str]:
        return ["OPENAI_API_KEY"]
    
class InputText(Node):
    pass

class OutputText(Node):
    pass