

// 1. The data contract inside the text chunk payload
export interface AiStreamChunk {
  content: string;
  done: boolean;
}

// 2. The custom callback typings for handling your stream state machine
export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onComplete: () => void;
  onError: (error: any) => void;
}
