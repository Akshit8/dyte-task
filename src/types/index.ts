export interface jwtPayload {
  id: string;
}

export interface ipLocation {
  city?: string;
  country?: string;
}

export interface APIResponse {
  status_code?: number;
  data?: any;
}
