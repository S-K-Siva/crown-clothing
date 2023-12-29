import { useState } from "react";
import { signAuthWithEmailAndPassword } from "../../utils/ firebase/firebase.utils.js";
import FormInput from "../Form/form.component.jsx";
import SignUp from "../sign-up/signup.component.jsx";
import './signin.styles.scss';
import Button from "../../components/button/button.component.jsx";
import Authentication from "../authentication/authentication.component.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/user.context.jsx";
const defaultValues = {
    displayName:'',
    email:'',
    password:'',
    confirm_password:''
};
const SignIn = () =>{
    const {setCurrentUser} = useContext(UserContext);
    const [formfields, setformfields] = useState(defaultValues);
    const {email,password} = formfields;
    const onSumitHandler = (event) => {

        const {name,value} = event.target;
        setformfields({...formfields,[name]:value});
    }
    const refreshInputFields = () =>{
        setformfields(defaultValues);
    }
    const submitHandler = async (event) =>{
        event.preventDefault();
        console.log("working...");
        // if(password !== confirm_password){
        //     alert("Email or password  is incorrrect!");
        //     refreshInputFields();
        //     return;
        // }
        const res = await signAuthWithEmailAndPassword(email,password);
        const {user} = res;
        if(res === 'error') refreshInputFields();
        console.log(res);
        setCurrentUser(user);
        console.log("got response");
    }
    return (

        <div className="sign-up-container">
            <div className="button-sign-up-container">
                <div>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={submitHandler}>
             
                
                <FormInput label="email" type="email" name="email" onChange={onSumitHandler} value={email} required/>
                <FormInput label = "Password" type="password" name="password" onChange={onSumitHandler} value={password} required/>
            
                <div className="signin-button-container">
                <Button content="Sign In" buttonType="inverted" type="submit" />
                <Authentication class="authentication_comp"/>
                </div>
            </form>
                
            </div>
            <SignUp />
            </div>
        </div>
    )
}

export default SignIn;