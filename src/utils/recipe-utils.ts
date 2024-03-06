import { Timestamp } from "firebase/firestore";
import { LoremIpsum } from "lorem-ipsum";

const recipeImages = ["recipe1.jpg", "recipe2.jpg", "recipe3.jpg"];

const lorem = new LoremIpsum();

export type RecipeType = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  img_url: string;
  ingredients: string[];
  instructions: string[];
  owner: string;
  creation_date: Timestamp;
};

export function getRecipe(): RecipeType {
  const authorName = lorem.generateWords(1);
  const authorLastname = lorem.generateWords(1);
  return {
    id: lorem.generateWords(1),
    name: lorem.generateWords(2),
    description: lorem.generateSentences(3),
    tags: Array.from(Array(2)).map(() => lorem.generateWords(1)),
    img_url: recipeImages[Math.floor(Math.random() * recipeImages.length)],
    ingredients: Array.from(Array(10)).map(
      (_, i) => `${i + 1} ${lorem.generateWords(1)}`
    ),
    instructions: Array.from(Array(10)).map(
      () => `${lorem.generateParagraphs(1)}`
    ),
    owner: [authorName, authorLastname].join(" "),
    creation_date: Timestamp.now(),
  };
}
