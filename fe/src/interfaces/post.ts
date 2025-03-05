export interface IPost {
  id: number;
  userId: number;
  userEmail: string;
  youtubeURL: string;
  title: string;
  description: string;
}

export interface ICreatePost {
  youtubeURL: string;
  title: string;
  description: string;
}

export interface IListPostsReq {
  page: number;
  pageSize: number;
}

export interface IListPostsResp {
  posts: IPost[];
  total: number;
}
