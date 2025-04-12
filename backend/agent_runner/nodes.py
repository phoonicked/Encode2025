from agent_runner.datum import *
from agent_runner.executor import CallingCtx
from openai import OpenAI

class Node:
    def __init__(self, id: int, data: any):
        self.id: int = id
        self.inputs: list[int] = []
        self.data: any = data

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

    def execute(self, *args, **kwargs) -> list[Datum]:
        """
        Executes the node. By default, it raises a NotImplementedError.
        Subclasses should override this method to define specific behavior.
        """
        raise NotImplementedError(f"Execute not implemented for {self.__class__.__name__}")

class InputNode(Node):
    pass

class OutputNode(Node):
    pass

class OpenAINode(Node):
    def requires_keys(self) -> list[str]:
        return ["OPENAI_API_KEY"]

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Simulates calling the OpenAI API with the given input text and API key.
        """

        tools = []
        if self.data["enableFunctions"]:
            t = self.data["function"]["outputType"]
            if t == "text":
                content = {
                    "type": "string",
                    "description": "The text input"
                }
            tools.append({
                "type": "function",
                "name": "function",
                "description": self.data["function"]["description"],
                "parameters": {
                    "type": "object",
                    "properties": {
                        t: content
                    },
                    "required": [t],
                    "additionalProperties": False
                }
            })

        client = OpenAI(
            api_key=context.key("OPENAI_API_KEY"),
        )

        print(inputs)

        response = client.responses.create(
            model=self.data["model"],
            instructions=self.data["systemPrompt"],
            input=inputs[0].tostring(),
            tools=tools
        )

        res = []

        if response.output and len(response.output) > 0:
            t = self.data["function"]["outputType"]
            r = eval(response.output[0].arguments)
            if t == "text":
                res = [StrDatum(r["text"])]
        else:
            res = [StrDatum(response.output_text)]

        # Simulate API call
        return res
    
class MintNode(Node):

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Simulates minting an NFT with the given input text and wallet address.
        """
        # Simulate minting an NFT

        # Establish websocket connection

        return [NFTDatum(inputs[0].tostring())]

class InputText(InputNode):

    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Returns the input text.
        """
        return [StrDatum(context.input_text)] if context.input_text else []

class OutputText(OutputNode):
    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Outputs the given text.
        """
        return [inputs[0]] if len(inputs) > 0 else []
    
class OutputNFT(OutputNode):
    def execute(self, inputs: list[Datum], context: CallingCtx) -> list[Datum]:
        """
        Outputs the given NFT.
        """
        # Filter out the NFT data
        return [inputs[0]] if len(inputs) > 0 else []