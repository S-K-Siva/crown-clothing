import './style.styles.scss';
import Button from '../button/button.component.jsx';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context.jsx';
import { CartItem } from '../cart-item/cart-item.component.jsx';

import { useNavigate } from 'react-router-dom';
const CardDropDown = () => {
    const {cartProductsItem} = useContext(CartContext);
    const navigate = useNavigate();

    const navigateToCheckOut = () => {
        navigate('/checkout');
    }
    return(
        
        <div className='cart-dropdown-container'>
            <div className="cart-items">
            {
                cartProductsItem.map((product)=>{
                    return <CartItem product={product} key={product.id}/>
                })
            }
            </div>
            <Button onClick={navigateToCheckOut} buttonType="inverted" content="Go To Cart" type="button" />
        </div>
    )
};

export default CardDropDown;