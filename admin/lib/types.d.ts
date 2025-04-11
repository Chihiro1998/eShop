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
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
    product?: {
      id: string;
      title: string;
      media: string[];
      description: string;
      price: number;
    };
  }[];
  amount: number;
  createdAt: Date;
};

export type UserType = {
  id: string;
  clerkId: string;
  wishlist: ProductType[];
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
};


export type OrderColumnsType = {
  _id: string;
  user: string;
  products: number;
  amount: number;
  createdAt: string;
};

export type OrderItemType = {
  product: ProductType;
  quantity: number;
  price: number;
};