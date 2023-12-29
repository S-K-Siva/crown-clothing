import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'; 
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
const CartIcon = () => {
    const {isOpen, setIsOpen} = useContext(CartContext);
    const toggleCartOpening = () => {
        return setIsOpen(!isOpen);
    }
    const {cartProductsItem} = useContext(CartContext);
    
    return(
        <div className='cart-icon-container' onClick={toggleCartOpening}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{0?cartProductsItem === undefined:cartProductsItem.length}</span>
        </div>
    )
}

export default CartIcon;