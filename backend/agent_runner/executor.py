class CallingCtx:
    def __init__(self, api_keys: dict[str, str]):
        self.api_keys = api_keys

    def key(self, key: str) -> str:
        """
        Retrieves the API key for the given key name.
        """
        return self.api_keys.get(key, None)