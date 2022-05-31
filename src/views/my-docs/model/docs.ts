export interface Doc {
  id?: string;
  name: string;
  title: string;
  description: string;
  link?: string;
  base64?: string;
}

export interface Docs {
  data: Doc[];
}

export interface DocsDetail {
  data: Doc;
}
