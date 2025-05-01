// types.ts
export interface Category {
    id: string
    name: string
  }
  
  export type ItemType = "starter" | "maindish" | "dessert"; 

 export type MenuItem = {
  id: string;
  name: string;
  price: number | null;
  description: string | null;
  isMainMenu: boolean;
  imageUrl: string;
  isSpecial: boolean;
  itemType: 'starter' | 'maindish' | 'dessert';
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}