export interface Post {
  body?: string;
  createdAt: string;
  identifier: string;
  slug: string;
  subName: string;
  title: string;
  updatedAt: string;
  username: string;
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
