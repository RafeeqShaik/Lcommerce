export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}
