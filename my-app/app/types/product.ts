// app/types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  color: string;
  imageUrl?: string;
  brand?: string;
  quantity: number;
  size?:number;
  sold: number;
}