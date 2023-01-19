export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type Photo = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

// TODO: check the error type
export type ErrorResponse = {
  code: number;
};
