import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import './checkout-item.styles.scss';
import './checkout.styles.scss';
const Checkout = () => {
    const {cartProductsItem,setIsOpen,incrementQuantityOfProduct,decrementQuantityOfProduct,deleteItemOfProduct} = useContext(CartContext);
    console.log(cartProductsItem);
    setIsOpen(!setIsOpen);
    return(
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>

            </div>
            
           <div>
            {
                cartProductsItem.map((product) => {
                    return(
                        <div className="checkout-item-container" key={product.id}>
            <div className="image-container">
                <img src={product.imageUrl} alt={`${product.name}`} />
            </div>
            <span className='name'>{product.name}</span>
            
            <span className="quantity">
                <div className="arrow" onClick={()=>decrementQuantityOfProduct(product)}>&#10094;</div>
                    <span className="value">{product.quantity}</span>
                <div className="arrow" onClick={()=>incrementQuantityOfProduct(product)}>&#10095;</div>
                </span>
            
            <span className="price">{product.price}</span>
            <div className="remove-button" onClick={()=>deleteItemOfProduct(product)}>&#10005;</div>
        </div>
                    )
                })
            }
              
            </div>
                <span className="total">Total: ${cartProductsItem.reduce((acc,cur) => acc + (cur.price * cur.quantity),0)}</span>
            
      </div>
    )
}
export default Checkout;