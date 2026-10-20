export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badge: string;
  description: string;
  specs: ProductSpec[];
}

export interface CustomOrderData {
  name: string;
  phone: string;
  interest: string;
  message: string;
}
