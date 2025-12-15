import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
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
      console.log("No such document! Seeding initial data...");
      await setDoc(docRef, INITIAL_DATA);
      return INITIAL_DATA;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return INITIAL_DATA;
  }
};

export const saveAppData = async (data) => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, data);
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

// Enquiry Functions
export const sendEnquiry = async (data) => {
  try {
    await addDoc(collection(db, "enquiries"), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return true;
  } catch (e) {
    console.error("Error adding enquiry: ", e);
    return false;
  }
};

export const getEnquiries = async () => {
    try {
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error(e);
        return [];
    }
};