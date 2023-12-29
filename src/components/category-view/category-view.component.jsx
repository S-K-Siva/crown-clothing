import { Fragment, useContext } from "react";
import { ProductContext } from "../../context/product.context";
import { ProductCard } from "../product-card/product-card.component";

import './category-view.styles.scss';
import { useParams } from "react-router-dom";
const CategoryView = () => {
    const {products,setCategoryView} = useContext(ProductContext);
    const {category} = useParams();
    console.log(products);
    const data = products[category];
    console.log(data);
    setCategoryView(category);
    
    return(
        
        <Fragment>
            {
                category && (
                    <div>
                    <h1>{category}</h1>
            
            <div className="cards-container">
            {
            Object.values(products[category]).map((product)=>{
                    return(
                        <Fragment key={product.id}>
                            <ProductCard CurrentProduct={product}/>
                        </Fragment>
                    )
                })
                    
                
            
        }
            </div>
            </div>
                )
            }
            
            
        </Fragment>
    )
}

export default CategoryView;