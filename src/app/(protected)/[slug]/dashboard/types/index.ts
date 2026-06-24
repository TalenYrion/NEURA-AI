import { GroqModel } from "@/app/(protected)/onboarding/types";

export interface DashboardMetrics {
  wordsAllowed: number;
  wordsUsed: number;
  totalFolders: number;
  totalDocuments: number;
}

export interface DashboardEngineInfo {
  model: GroqModel;
  status: 'operational' | 'degraded' | 'offline';
}

export interface DashboardStatsResponse {
  status: string;
  nodeId: string;
  name: string;
  slug: string;
  engine: DashboardEngineInfo;
  metrics: DashboardMetrics;
}


export interface DocumentResponse {
  id: string;
  workspaceId: string;
  folderId: string | null;
  title: string;
  content: string;
  toolType: string;
  wordCount: number;
  createdAt: string; // 💡 Dates are serialized to ISO strings over network payloads
}
