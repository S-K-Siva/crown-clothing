
import './category-item.styles.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../context/product.context';
const CategoryItem = (category) =>{
  const {setCategoryView} = useContext(ProductContext);
  console.log(category);
    return (
        <div className='category-container' key = {category.category.title}>
            {category.category.id && 
              <div className='background-image' style={
                {backgroundImage:`url(${category.category.imageUrl})`}
              }/>
            }
        <div className = "category-body-container">
          {/* <h1>{Object.keys(category)}</h1> */}
          <h2>{category["category"]["title"]}</h2>
          <span className="nav-link"><Link className="nav-link" onClick={()=>setCategoryView(category.category.title)} to={`/shop/${category.category.title}`}>Shop Now</Link></span>
        </div>
      </div>
    )
}

export default CategoryItem;