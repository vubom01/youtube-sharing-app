export interface IPost {
  id: number;
  userId: number;
  userEmail: string;
  youtubeURL: string;
  title: string;
  description: string;
  createdAt: number;
}

export interface ICreatePost {
  youtubeURL: string;
  title: string;
  description: string;
}
