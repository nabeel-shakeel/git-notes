export interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  content?: string;
}

export interface Gist {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  files: Record<string, GistFile>;
  html_url: string;
}

export interface SingleGist extends Gist {
  forks: any[];
}

export interface StarGistResponse {
  status: number;
}
