
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAogx9SvlXsGwG1bnIriRS25tt6Z57zu7g",
    authDomain: "house-marketplace-app-eb750.firebaseapp.com",
    projectId: "house-marketplace-app-eb750",
    storageBucket: "house-marketplace-app-eb750.appspot.com",
    messagingSenderId: "371695117083",
    appId: "1:371695117083:web:039d37b1375ec8d4e369be",
    measurementId: "G-WYPBYWTHSG"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()