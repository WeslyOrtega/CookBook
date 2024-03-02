import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

export type RecipeType = {
  title: string;
  description: string;
  tags: string[];
};

export function getRecipe(): RecipeType {
  return {
    title: lorem.generateWords(2),
    description: lorem.generateSentences(3),
    tags: Array.from(Array(3)).map(() => lorem.generateWords(1)),
  };
}

export function getRecipes(n: number): RecipeType[] {
  return Array.from(Array(n)).map(() => getRecipe());
}
