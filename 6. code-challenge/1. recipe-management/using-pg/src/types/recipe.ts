export type Ingredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
};
