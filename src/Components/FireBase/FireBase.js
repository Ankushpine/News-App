import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCmFH_3dJN59oVTEq9wxtaihwTTe7_qw44",
  authDomain: "pine-news-app.firebaseapp.com",
  projectId: "pine-news-app",
  storageBucket: "pine-news-app.appspot.com",
  messagingSenderId: "979900096680",
  appId: "1:979900096680:web:f2a5e78d4cfbf98e30a29d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;