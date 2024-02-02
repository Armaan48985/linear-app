﻿import {
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
  date: Date
) {
  try {
    const userCollectionRef = collection(db, "users");
    const userDocumentRef = doc(userCollectionRef, userName || "naruto");
    const projectsCollectionRef = collection(userDocumentRef, "projects");
    const projectsDocumentRef = doc(projectsCollectionRef, issueType);
    const issuesCollectionRef = collection(projectsDocumentRef, "issues");
    const issueDocumentRef = doc(issuesCollectionRef, name);

    await setDoc(issueDocumentRef, { name: name, type: issueType, time: date });
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
    const projectsCollectionRef = collection(userDocumentRef, "projects");
    const projectsDocumentRef = doc(projectsCollectionRef, "dummy-project");
    const projectsDocRef = collection(projectsDocumentRef, "issues");
    const issueTypeRef = collection(projectsDocRef, issueType);

    const querySnapshot = await getDocs(issueTypeRef);

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

export async function DeleteDataFromFireStore(userName: any, name: any) {
  try {
    const userCollectionRef = collection(db, "users");
    const userDocumentRef = doc(userCollectionRef, userName || "naruto");
    const projectsCollectionRef = collection(userDocumentRef, "projects");
    const projectsDocumentRef = doc(projectsCollectionRef, "dummy-project");
    const projectsDocRef = collection(projectsDocumentRef, "issues");
    const issueDocumentRef = doc(projectsDocRef, name);

    await deleteDoc(issueDocumentRef);
    return true;
  } catch (error) {
    console.error("Error deleting data from Firestore:", error);
    return false;
  }
}
