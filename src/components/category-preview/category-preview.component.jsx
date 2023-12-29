

import { useContext } from 'react';
import './category-preview.styles.scss';
import { ProductContext } from '../../context/product.context';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ProductCard } from '../product-card/product-card.component';
const CategoryPreview = () => {
    const {products,setCategoryView} = useContext(ProductContext);

    return (
        <Fragment>
            
            

            {
                 Object.keys(products).map((title) =>   
                
            {
                return(
                    <Fragment key={title}>
                        <Link class="nav-link" to={`${title}`} onClick={()=>setCategoryView(title)}> 
                        <div>
                            <h1 style={{paddingTop:"2rem"}}>{title} </h1>
                        </div>
                        
                        </Link>
            <div class = "cards-container">
                    {
                products[title]
                .filter((_,idx)=>idx<4)
                .map((product)=>{
                if (product !== undefined){
                    const {id} = product;
                return (    
                <Fragment key={id}>
                        <ProductCard CurrentProduct={product} />
                </Fragment>

                )
                }else{
                    return <Fragment></Fragment>
                }
                })
                }
                
                
                </div>
                </Fragment>
                )
            }
                
    
                 )
        }
                     
           

         
       </Fragment>
    );
}

export default CategoryPreview;