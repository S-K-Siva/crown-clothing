import { createContext,useState,useEffect } from "react";
// import SHOP_DATA from '../shop-data';
// import { dbWorkLoad } from "../utils/ firebase/firebase.utils";
import { getDataFromFireStore } from "../utils/ firebase/firebase.utils";
export const ProductContext = createContext({
    products:{},
    categoryView:null,
    setCategoryView:()=>null,
    
});


export const ProductProvider = ({content}) => {
    const [products,setProducts] = useState({});
    const [categoryView,setCategoryView] = useState("NOTHING");
    useEffect(()=>{
        const getData = async() => {
            const data = await getDataFromFireStore('collections');
            setProducts(data);
        }
        getData();
        
    },[])
    // We runnning only once, bcz we updating this only once in the db, in order to reduce duplications.
    // useEffect(
    //     ()=>{
    //         dbWorkLoad('collections',SHOP_DATA);
    //     },
    //     []
    // );
    const value = {products,setProducts,categoryView,setCategoryView};
    return (
    <ProductContext.Provider value={value}>{content}</ProductContext.Provider>
    );
}

