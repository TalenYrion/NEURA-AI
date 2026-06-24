export enum GroqModel {
  // 💡 Updated to Groq's active Speculative Decoding string (Ultra-fast 70B output)
  LLAMA_3_3_70B = 'llama-3.3-70b-specdec',

  // 💡 Updated to Groq's official active 8B identifier string
  LLAMA_3_1_8B = 'llama-3.1-8b-instant',

  // 💡 Valid and highly active high-reasoning alternative
  GPT_OSS_120B = 'openai/gpt-oss-120b',
}

export interface UserStateResponce {
  hasWorkspace: boolean;
  redirectTo: string;
}

export const SUPPORTED_MODELS = [
  {
    id: GroqModel.LLAMA_3_3_70B,
    name: 'Llama 3.3 Versatile',
    tier: 'premium',
  },
  {
    id: GroqModel.LLAMA_3_1_8B,
    name: 'Llama 3.1 Instant',
    tier: 'standard',
  },
  {
    id: GroqModel.GPT_OSS_120B,
    name: 'Mixtral MoE',
    tier: 'standard',
  },
];

export interface OnboaringInput {
  name: string;
  selectedModel: GroqModel;
}

export interface WorkspaceResponse {
  id: string;
  name: string;
  slug: string;
  selectedModel: GroqModel;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
