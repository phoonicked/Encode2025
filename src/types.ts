// src/types.ts

// Common base for node data
export interface BaseNodeData {
    label: string;
  }
  
  // Data type for NFT output node
  export interface NFTOutputNodeData extends BaseNodeData {
    contractAddress: string;
    // Add additional NFT-related properties if needed
  }
  
  // Data type for Text output node (for displaying output)
  export interface TextOutputNodeData extends BaseNodeData {
    outputText: string;
    // Additional text node fields can be defined here
  }
  
  // Data type for Text input node
  export interface TextInputNodeData extends BaseNodeData {
    inputText: string;
  }
  
  // Data type for OpenAI node
  export interface OpenAINodeData extends BaseNodeData {
    model: string; // e.g., "gpt-3.5-turbo" or "gpt-4"
  }
  