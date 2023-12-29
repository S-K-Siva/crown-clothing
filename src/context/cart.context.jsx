import { createContext,useState} from "react"
export const CartContext = createContext({
    isOpen: false,
    setIsOpen : () => {},
    cartProductsItem : [],
    addToCart: () => {},
    setProductItems : () => null
});

export const CartProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [cartProductsItem,setProductItems] = useState([]);
    const addToCart = (productToAdd) => {
        let found = false;
        const {id} = productToAdd;
        const joinID = id;
        const newArray = cartProductsItem.map((product)=>{
            const {id} = product;
            if(id === joinID){
                const newProduct = Object.assign({},{...product,quantity:product.quantity+1});
                found = true;
                return newProduct;
            }
            return product;
        });
        
        if(!found) newArray.push({...productToAdd,quantity:1});
        console.log("Here is new Array:",newArray);
        console.log(newArray)
        setProductItems(newArray);
    }
    const incrementQuantityOfProduct = (product) => {
        const newArray = cartProductsItem.map((item)=>{
            if(!item)  return false;
            if(item.id === product.id){
                const newItem = {...item,quantity:item.quantity+1};
                return newItem;
            }
            else{
                return item;
            }
        });
        setProductItems(newArray);
    }
    const deleteItemOfProduct = (product) => {
        const result = cartProductsItem.filter((item) => item.id !== product.id);
        
        setProductItems(result);
    }
    const decrementQuantityOfProduct = (product) => {
        if(product.quantity === 1){
            deleteItemOfProduct(product);
            return;
        }
        const newArray = cartProductsItem.map((item)=>{
            if(item === undefined) return false;
            if(item.id === product.id){
                
                    const newItem = {...item,quantity:item.quantity-1};
                    return newItem;
                
            }
            else{
                return item;
            }
            
        });
        setProductItems(newArray);
    }
    const value = {isOpen,setIsOpen,cartProductsItem,setProductItems,addToCart,incrementQuantityOfProduct,decrementQuantityOfProduct,deleteItemOfProduct};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

