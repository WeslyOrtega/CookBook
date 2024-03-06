import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import firebase_config from "../resources/firebase/firebase_config.json";

const app = initializeApp(firebase_config);

const firestore = getFirestore(app);
export const recipesDB = collection(firestore, "recipes");

const storage = getStorage(app);
const recipeImagesStorage = ref(storage, "recipe_pictures");
export function getRecipeImage(img_name: string) {
  return getDownloadURL(ref(recipeImagesStorage, img_name));
}
