class Datum:
    """
    Represents a data object that can be passed between nodes in a pipeline.
    """

    def __init__(self, data: any):
        self.data = data

    def __repr__(self):
        return f"Datum({self.data})"

    def __str__(self):
        return str(self.data)

    def __eq__(self, other):
        if not isinstance(other, Datum):
            return False
        return self.data == other.data
    
    def __hash__(self):
        return hash(self.data)
    
    def tostring(self) -> str:
        """
        Converts the data to a string representation.
        """
        return str(self.data)
    
def StrDatum(data: str) -> Datum:
    """
    Creates a Datum object from a string.
    """

    return Datum(data)

def NFTDatum(data: str) -> Datum:
    """
    Creates a Datum object from an NFT string.
    """
    return Datum(data)