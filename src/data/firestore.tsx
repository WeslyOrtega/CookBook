import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebase_config from "../resources/firebase/firebase_config.json";

const app = initializeApp(firebase_config);

export default getFirestore(app);
