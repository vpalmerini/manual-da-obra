interface File {
  name: string;
  url: string;
}

interface FileCard extends File {
  _id: string;
  type: string;
}

export type {
  File,
  FileCard
}