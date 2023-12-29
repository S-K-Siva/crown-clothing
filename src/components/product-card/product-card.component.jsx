import Button from '../button/button.component';
import './product-card.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
export const ProductCard = ({CurrentProduct}) => {
    
    const {id,name,price,imageUrl} = CurrentProduct;
   
    const {addToCart} = useContext(CartContext);

    return (
        <div className='product-card-container' key={id}>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={()=>addToCart(CurrentProduct)}buttonType="inverted" content="Add to Cart" type="button"/>
        </div>
    )
}
