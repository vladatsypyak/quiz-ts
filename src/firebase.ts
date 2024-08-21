import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCQreRE6E8j4-JHNpTXEgQCfl-LyfWmq18",
    authDomain: "quiz-eb5aa.firebaseapp.com",
    projectId: "quiz-eb5aa",
    storageBucket: "quiz-eb5aa.appspot.com",
    messagingSenderId: "880321159386",
    appId: "1:880321159386:web:07aa609a78b19b01df45e3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
