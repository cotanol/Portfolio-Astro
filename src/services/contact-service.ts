import { addDoc, collection } from "firebase/firestore";
import db from "../db/db";
import type { Contact } from "../types/contact";

export const createContact = async (contact: Contact) => {
  const collectionName = collection(db, "contacts");
  try {
    const { id, ...contactWithoutId } = contact;
    await addDoc(collectionName, contactWithoutId);
  } catch (error) {
    console.error("Error adding document: ", error);
  } finally {
    console.log("Process completed");
  }
};
