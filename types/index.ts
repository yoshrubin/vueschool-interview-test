export interface Post {
  id?: string;
  image?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  userId?: string;
  publishedAt?: number;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export type PostWithUser = Post & { user: User };

export type OrderBy = "newestFirst" | "oldestFirst" | undefined;

export interface Query {
  limit: number;
  offset: number;
  order: OrderBy;
  include: string;
  select: string;
}
