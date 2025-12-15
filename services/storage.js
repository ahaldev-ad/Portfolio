import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, auth } from "../src/firebase";
import { INITIAL_DATA } from '../constants';

const DOC_ID = "portfolio_content";
const COLLECTION = "settings";

export const getAppData = async () => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Seed database if empty
      console.log("No such document! Seeding initial data...");
      await setDoc(docRef, INITIAL_DATA);
      return INITIAL_DATA;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    // Fallback to initial data if firebase isn't configured yet
    return INITIAL_DATA;
  }
};

export const saveAppData = async (data) => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, data);
    // Trigger update event
    window.dispatchEvent(new Event('storage-update'));
  } catch (error) {
    console.error("Error saving document: ", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Login failed", error);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
  }
};