import { createContext,useEffect,useState } from "react";
import { onAuthStateChangedListner,createUserWithGooglePopUp } from "../utils/ firebase/firebase.utils";

export const UserContext = createContext(
    {
        currentUser:null,
        setCurrentUser:() => null,
    }
);

export const UserProvider = ({content}) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};
    // centralizing all the authentication stuff in context file.

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner((user) => {
            if(user){
                createUserWithGooglePopUp(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    },[])
    return <UserContext.Provider value={value}>{content}</UserContext.Provider>;
};
