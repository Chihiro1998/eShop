export type ProductType = {
  id: string;
  title: string;
  description: string;
  media: string[];
  category: string[];
  collections: string[];
  tags: string[];
  sizes: string[];
  price: number;
  expense: number;
};

export type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: string[];
};