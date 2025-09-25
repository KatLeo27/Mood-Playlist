// newclient/src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4ueOFJQMD6yjLr4pIqp17eeUspnHrg10",
  authDomain: "mood-playlist-33e8a.firebaseapp.com",
  projectId: "mood-playlist-33e8a",
  storageBucket: "mood-playlist-33e8a.appspot.com",
  messagingSenderId: "601030766214",
  appId: "1:601030766214:web:9b9e82a7a89e08ecba2b07"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
