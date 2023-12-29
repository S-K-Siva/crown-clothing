import { Outlet,Link } from "react-router-dom";
import { Fragment} from "react";
import { ReactComponent as CrownJwl } from "../../assets/crown.svg";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { SignOutUser } from "../../utils/ firebase/firebase.utils";
import './navigation.styles.scss';
import CartIcon from "../../components/cart/cart-icon.component";
import CardDropDown from "../../components/cart-dropdown/card-dropdown.component";

import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";
const NavBar = () =>{
    const {isOpen } = useContext(CartContext);
    const {currentUser,setCurrentUser} = useContext(UserContext);
    console.log("printing from navbar:",currentUser);

    const signOutFunc = async () => {
        console.log('triggered');
        console.log(currentUser);
    await SignOutUser(currentUser);
    setCurrentUser(null);
    
    console.log(currentUser);
}   
    
    const navigate = useNavigate();
    const navigateToHomeScreen = () => 
    {
        
        return navigate('/');
    }
    return(
        <Fragment>
            <nav class="navigation">
                <Link class='logo-container' to='/'>
                    <CrownJwl />
                </Link>
               
                
                    <div class="nav-links-container">
                      
                        <Link className='nav-item nav-link' to='/shop'>
                            <div>Shop</div>
                        </Link>
                        
                            {currentUser?(
                                <Link className='nav-item nav-link' onClick={signOutFunc} to='/signin'>
                                    <div>Sign out</div>
                                </Link>
                            ):
                        (

                                <Link className='nav-item nav-link' to='/signin'>
                                    <div>Sign in</div>
                                </Link>
                        )
                            }
                    
                        <Link className='nav-item nav-link' to="#">
                            <CartIcon />
                        </Link>
                        {
                            currentUser ? navigateToHomeScreen() : "" 
                        }
                      

                    </div>

                    {isOpen && <CardDropDown />}
                
                </nav>
                <Outlet />
        </Fragment>
    )
}
export default NavBar;