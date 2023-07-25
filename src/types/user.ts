export type UserProps = {
    avatar_url: string;
    login: string;
    location: string;
    followers: number;
    following: number;
    html_url: string;
    bio: string,
    name: string,
  };

export type UserReposProps = {
  visibility: string; 
  language: string;
  forks: number;
  html_url: string;
  name: string;
  description: string;
}