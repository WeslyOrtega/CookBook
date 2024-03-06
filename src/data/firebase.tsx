import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import firebase_config from "../resources/firebase/firebase_config.json";

const app = initializeApp(firebase_config);

export const firestore = getFirestore(app);

const storage = getStorage(app);
const recipeImagesStorage = ref(storage, "recipe_pictures");
export function getRecipeImage(img_name: string) {
  return getDownloadURL(ref(recipeImagesStorage, img_name));
}
