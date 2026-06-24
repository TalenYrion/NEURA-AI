export interface WorkspaceUpdateResponse {
  id: string;
  name: string;
  slug: string;
  selectedModel: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  fullName: string | null;
  updatedAt: string;
}
