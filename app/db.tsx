import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function addDataToFireStore(
  name: string,
  issueType: string,
  userName: string,
  date: object,
  priority: string, 
  label: string,
  dueDate: string
) {
  try {
    const userCollectionRef = collection(db, "users");
    const userDocumentRef = doc(userCollectionRef, userName || "naruto");
    const projectsCollectionRef = collection(userDocumentRef, "project");
    const projectsDocumentRef = doc(projectsCollectionRef, "issues");
    const issuesCollectionRef = collection(projectsDocumentRef, issueType);
    const issueDocumentRef = doc(issuesCollectionRef, name);

    await setDoc(issueDocumentRef, { name: name, type: issueType, time: date, priority : priority, label: label, dueDate: dueDate });
    return true;
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    return false;
  }
}

export async function fetchDataFromFireStore(userName: any, issueType: string) {
  try {
    const userCollectionRef = collection(db, "users");
    const userDocumentRef = doc(userCollectionRef, userName || "naruto");
    const projectsCollectionRef = collection(userDocumentRef, "project");
    const projectsDocumentRef = doc(projectsCollectionRef, "issues");
    const issuesCollectionRef = collection(projectsDocumentRef, issueType);

    const querySnapshot = await getDocs(issuesCollectionRef);

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  }
}

export async function DeleteDataFromFireStore(userName: string, issueType: string, name: string) {
  try {
    const userCollectionRef = collection(db, "users");
    const userDocumentRef = doc(userCollectionRef, userName || "naruto");
    const projectsCollectionRef = collection(userDocumentRef, "project");
    const projectsDocumentRef = doc(projectsCollectionRef, "issues");
    const issuesCollectionRef = collection(projectsDocumentRef, issueType);
    const issueDocumentRef = doc(issuesCollectionRef, name);
    
    await deleteDoc(issueDocumentRef);
    return true; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting data from Firestore:", error);
    return false; // Return false if an error occurs
  }
}
