import { LoremIpsum } from "lorem-ipsum";

const recipeImages = ["recipe1.jpg", "recipe2.jpg", "recipe3.jpg"];

const lorem = new LoremIpsum();

export type RecipeType = {
  title: string;
  description: string;
  tags: string[];
  img_url: string;
};

export function getRecipe(): RecipeType {
  return {
    title: lorem.generateWords(2),
    description: lorem.generateSentences(3),
    tags: Array.from(Array(2)).map(() => lorem.generateWords(1)),
    img_url: recipeImages[Math.floor(Math.random() * recipeImages.length)],
  };
}

export function getRecipes(n: number): RecipeType[] {
  return Array.from(Array(n)).map(() => getRecipe());
}
