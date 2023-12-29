import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,
signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'

import {getFirestore,doc,getDoc,setDoc,collection, writeBatch,query,getDocs} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7wj7ILoPv9HRj2QizFIBugePccWvND4o",
  authDomain: "crown-clothing-dfb5f.firebaseapp.com",
  projectId: "crown-clothing-dfb5f",
  storageBucket: "crown-clothing-dfb5f.appspot.com",
  messagingSenderId: "681791253570",
  appId: "1:681791253570:web:6eb6a8261cf3bba0f751db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account",
});

export const auth = getAuth();
export const db = getFirestore();

export const dbWorkLoad = async (collectionName, data) => {
    const collectionRef = collection(db,collectionName);
    const batch = writeBatch(db);

    data.forEach((obj) => {
        const docRef = doc(collectionRef,obj.title.toLowerCase());
        batch.set(docRef,obj);
    });
    

    await batch.commit();
    console.log("done");
}
export const createUserWithGooglePopUp = async (user) => {
    const getUserRef = doc(db,'users',user.uid);

    const getSnapshot = await getDoc(getUserRef);

    if(!getSnapshot.exists()){
        const {displayName, email} = user;
        const createdAt = new Date();
        const createUserRef = await setDoc(getUserRef,
            {
                displayName,
                email,
                createdAt
            });
        return createUserRef;
    }else{
        return getUserRef;
    }
}

export const getDataFromFireStore = async (collectionName) => {
    const collectionRef = collection(db,collectionName);
    const Q = query(collectionRef);
    const snapShot = await getDocs(Q);
    const finalData = snapShot.docs.reduce((acc,cur) => {
        const {title ,items} = cur.data();
        // console.log(cur);
        acc[title]= items;
        return acc;
    },{});
    return finalData;
}
export const signInWithGooglePopUp = () => {
    return signInWithPopup(auth,provider);
};

export const createAuthWithEmailAndPassword = async (email,password,displayName) => {
    if(!email || !password) return;
    try{
    const response = await createUserWithEmailAndPassword(auth,email,password);
    const {user} = response;
    console.log(user);
    
    const userRef = doc(db,'users',user.uid);
    
    const userSnapshot = await getDoc(userRef);
    if(!userSnapshot.exists()){
        const createdAt = new Date();
        const newUserRef = await setDoc(userRef,{
            displayName,
            email,
            createdAt
        });
        newUserRef['displayName'] = displayName;
        return newUserRef;
    }
    else{
        return userRef;
    }
}
    catch(err){
        alert("Already the account is created with this email id.");
        return 'error';
    }
    
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