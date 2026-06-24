export interface UserResponse {
  id: number;
  fullname?: string;
  email?: string;
}

// Form inputs are partials or exact configurations matching your fields
export interface RegisterInput {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface LoginInput {
  email?: string;
  password?: string;
}
