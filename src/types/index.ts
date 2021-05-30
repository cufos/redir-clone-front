export interface Post {
  body?: string;
  createdAt: string;
  identifier: string;
  slug: string;
  subName: string;
  title: string;
  updatedAt: string;
  username: string;
  sub?: Sub;
  // virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  uodatedAt: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  posts: Post[];
  username: string;
  // virtuals
  imageUrl: string;
  bannerUrl: string;
  postCount?: number;
}

export interface Comment {
  createdAt: string;
  updatedAt: string;
  identifier: string;
  body: string;
  username: string;
  post?: Post;
  // virtuals
  userVote: number;
  voteScore: number;
}
