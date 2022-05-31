export interface Doc {
  id?: string;
  title: string;
  description: string;
  link?: string;
  base64?: string;
}

export interface Docs {
  data: Doc[];
}
