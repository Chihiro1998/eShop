export type ProductType = {
  id: string;
  title: string;
  description: string;
  media: string[];
  category: string[];
};

export type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: string[];
};