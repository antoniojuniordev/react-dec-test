export interface Doc {
  id?: string;
  name: string;
  title: string;
  description: string;
  link?: string;
  base64?: string;
  createdAt?: string;
}

export interface Docs {
  data: Doc[];
  count: number;
}

export interface DocsDetail {
  data: Doc;
}
