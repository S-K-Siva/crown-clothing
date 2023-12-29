import Button from "../../components/button/button.component.jsx";
import { signInWithGooglePopUp } from "../../utils/ firebase/firebase.utils.js"
const triggerGooglePopUp = async () => {
    console.log("triggered");
    await signInWithGooglePopUp();
    // const response = await signInWithGooglePopUp();
    // const {user} = response;
    // const userReference = await createUserWithGooglePopUp(user);
    // console.log(userReference);
}
const Authentication = () => {
    return (
        <div>
            
            <Button onClick={triggerGooglePopUp} content="Sign in with Google Account" buttonType="google" type="button"/>
            
        </div>
    )
}

export default Authentication;