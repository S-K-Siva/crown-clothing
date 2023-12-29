import { useState } from "react";
import { createAuthWithEmailAndPassword } from "../../utils/ firebase/firebase.utils";
import FormInput from "../Form/form.component";
import { useContext } from "react";
import { UserContext } from "../../context/user.context.jsx";
import './signup.styles.scss';
import Button from "../../components/button/button.component.jsx";
const defaultValues = {
    displayName:'',
    email:'',
    password:'',
    confirm_password:''
};
const SignUp = () =>{
    const {setCurrentUser} = useContext(UserContext);
    const [formfields, setformfields] = useState(defaultValues);
    const {displayName,email,password,confirm_password} = formfields;
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
        if(password !== confirm_password){
            alert("Email or password  is incorrrect!");
            refreshInputFields();
            return;
        }
        console.log("displayName",displayName);
        const res = await createAuthWithEmailAndPassword(email,password,displayName);
        if(res === 'error') refreshInputFields();
        const {user} = res;
        setCurrentUser(user);
        console.log(res);
        console.log("got response");
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitHandler}>
             
                <FormInput label="displayName" type="text" name="displayName" onChange={onSumitHandler} value={displayName} required/>
                <FormInput label="email" type="email" name="email" onChange={onSumitHandler} value={email} required/>
                <FormInput label = "Password" type="password" name="password" onChange={onSumitHandler} value={password} required/>
                <FormInput label = "Confirm Password" type="password" name="confirm_password" onChange={onSumitHandler} value={confirm_password} required/>
      
                <Button content="Sign Up" buttonType="inverted" type="submit" />
            </form>
        </div>
    )
}

export default SignUp;