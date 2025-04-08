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

export type OrderType = {
  _id: string;
  user: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  amount: number;
  createdAt: Date;
};

export type UserType = {
  id: string;
  clerkId: string;
  wishlist: string[];
  addresses: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};