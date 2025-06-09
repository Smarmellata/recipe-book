export interface Ingredient {
  type: string;
  quantity: string;
}

export interface Recipe {
  idMeal: string;
  name: string;
  description: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  ingredients: Ingredient[];
  tags: string | null;
  isFavorite?: boolean; // Optional, used for UI state
}
