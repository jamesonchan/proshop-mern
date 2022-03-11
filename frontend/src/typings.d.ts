export interface ProductProp {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: string[];
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface UpdateUserProfile {
  id: string | undefined;
  name: string;
  email: string;
  password: string;
}
