export type MenuCategoryType =
  | 'All'
  | 'Beverages'
  | 'Breakfast'
  | 'Chinese'
  | 'Soup'
  | 'Tandoori Starters'
  | 'Main Course'
  | 'Rice'
  | 'Dal'
  | 'Roti'
  | 'Salad and Curd'
  | 'Desserts';

export type PriceType =
  | number
  | { half?: number; full: number }
  | string; // e.g. "MRP"

export interface MenuItem {
  id: string;
  name: string;
  nameHindi?: string;
  category: Exclude<MenuCategoryType, 'All'>;
  price: PriceType;
  description: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
  image?: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  portion: 'regular' | 'half' | 'full';
  price: number;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  featured?: boolean;
}
