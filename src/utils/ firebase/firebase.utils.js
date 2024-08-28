import {initializeApp} from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {doc,getDoc,setDoc, getFirestore,collection,writeBatch,query,getDocs} from "firebase/firestore";
// onAuthStateChangedListenr
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCOWRNy_dOw5NyVECk6R_tO-r-rIjOsC3s",
  authDomain: "crown-clothing2-app.firebaseapp.com",
  projectId: "crown-clothing2-app",
  storageBucket: "crown-clothing2-app.appspot.com",
  messagingSenderId: "371736631032",
  appId: "1:371736631032:web:3165a8896f8cb71133cd0d",
  measurementId: "G-ZB1NXR1NNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);
export const db = getFirestore();

export const createUserDocumentsFromAuth = async(userAuth) => {
    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);


    // if user data exists, just return the user reference
    if(!userSnapShot.exists()){
        try{
            const {displayName, email} = userAuth;
            const createdAt = new Date();
            await setDoc(userDocRef, {
                displayName : displayName,
                email : email,
                createdAt : createdAt
            })
        }catch(error){
            console.log("Error while creating user Snapshot");
        }
    }
    // if user exists already
    return userDocRef;
}

// create user with an email and password
export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

// auth state listner
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

export const signOutUser =  () => signOut(auth);


export const addCollectionsAndDocuments = async (collectionName, objectsToAdd) => {
    const collectionRef = collection(db,collectionName);
    const batch = writeBatch(db);


    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();
    console.log("Data is pushed into firestore!");
}

export const getCategoryAndDocuments = async() => {
    const collectionRef = collection(db,'categories');

    // first intialize the query for the collection
    const q = query(collectionRef);
    // we getting the SnapShot(location of all the data/queries of the 'categories' collection)
    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc,item)=>{
        const {title,items} = item.data();
        acc[title] = items;
        return acc;
    },{});
    
    return categoryMap;
}

export const signAuthWithEmailAndPassword = async (email,password) =>{
    return await signInWithEmailAndPassword(auth,email,password);
}

export const SignOutUser = async () => {
    return await signOut(auth);
}

export const onAuthStateChangedListner = (callback) =>{
    return onAuthStateChanged(auth,callback);
};
