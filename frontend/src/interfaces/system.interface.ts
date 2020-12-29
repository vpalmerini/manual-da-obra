interface System {
  name: string;
  description: string;
}

interface SystemCard extends System {
  _id: string;
  nickname: string;
  construction: string;
}

export type {
  System,
  SystemCard
};