from agent_runner.datum import *
from agent_runner.executor import CallingCtx

class Node:
    def __init__(self, id: int):
        self.id: int = id
        self.inputs: list[int] = []

    def __repr__(self):
        return f"Node({self.id} <= {self.inputs})"

    def requires_keys(self) -> list[str]:
        return []
    
    def is_input(self) -> bool:
        """
        Determines if the node is an input node.
        """
        return isinstance(self, InputNode)
    
    def is_output(self) -> bool:
        """
        Determines if the node is an output node.
        """
        return isinstance(self, OutputNode)

    def execute(self, *args, **kwargs):
        """
        Executes the node. By default, it raises a NotImplementedError.
        Subclasses should override this method to define specific behavior.
        """
        raise NotImplementedError(f"Execute not implemented for {self.__class__.__name__}")

class InputNode(Node):
    pass

class OutputNode(Node):
    pass

class OpenAI(Node):
    def requires_keys(self) -> list[str]:
        return ["OPENAI_API_KEY"]

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Simulates calling the OpenAI API with the given input text and API key.
        """
        # Simulate API call
        print(inputs)
        return [StrDatum(f"Processed by OpenAI: {inputs[0]}")]

class InputText(InputNode):

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Returns the input text.
        """
        return [StrDatum("Input Text")]

class OutputText(OutputNode):
    def execute(self, inputs: list[Datum], context: CallingCtx) -> Datum:
        """
        Outputs the given text.
        """
        return [inputs[0]] if len(inputs) > 0 else []