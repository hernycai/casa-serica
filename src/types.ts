export interface ProductSpec {
  label: string;
  value: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  transferPrice: number;
  transferDiscountPercent: number;
  image: string;
  badge: string;
  description: string;
  colors: ColorOption[];
  specs: ProductSpec[];
}

export interface CustomOrderData {
  name: string;
  phone: string;
  interest: string;
  message: string;
}
