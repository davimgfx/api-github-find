export type UserProps = {
  avatar_url: string;
  login: string;
  location: string;
  followers: number;
  following: number;
  html_url: string;
  bio: string;
  name: string;
  blog: string;
};

export type UserReposProps = {
  visibility: string;
  language: string;
  forks: number;
  html_url: string;
  name: string;
  description: string;
  stargazers_count: number;
  message: string;
  error: boolean;
  // New property added
};

export type UserFollowersProps = {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
}

export type UserFollowingsProps = {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number
}

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

