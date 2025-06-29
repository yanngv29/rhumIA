export interface Rhum {
  _id: string;
  name: string;
  type: string;
  origin: string;
  abv: number;
  description?: string;
  imageUrl?: string;
  // New fields
  age?: number;
  alcoholPercentage?: number;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RhumResponse {
  success: boolean;
  count: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  data: Rhum[];
}