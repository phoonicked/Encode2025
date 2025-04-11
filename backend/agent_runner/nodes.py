from agent_runner.datum import Datum
from agent_runner.executor import CallingCtx

class Node:
    def __init__(self, id: int):
        self.id: int = id
        self.inputs: list[Node] = []

    def __repr__(self):
        return f"Node({self.id})"

    def requires_keys(self) -> list[str]:
        return []

    def execute(self, *args, **kwargs):
        """
        Executes the node. By default, it raises a NotImplementedError.
        Subclasses should override this method to define specific behavior.
        """
        raise NotImplementedError(f"Execute not implemented for {self.__class__.__name__}")

class OpenAI(Node):
    def requires_keys(self) -> list[str]:
        return ["OPENAI_API_KEY"]

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Simulates calling the OpenAI API with the given input text and API key.
        """
        # Simulate API call
        return f"Processed by OpenAI: {inputs[0]}"

class InputText(Node):

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Returns the input text.
        """
        return self.text

class OutputText(Node):
    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Outputs the given text.
        """
        print(f"Output: {inputs[0]}")