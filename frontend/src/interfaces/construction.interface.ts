interface Construction {
  name: string;
  location: string;
  image: string;
}

interface ConstructionCard extends Construction {
  _id: string;
}

export type {
  Construction,
  ConstructionCard
};