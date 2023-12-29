
import { Routes, Route } from "react-router-dom";
import CategoryView from "../category-view/category-view.component.jsx";
import CategoryPreview from "../category-preview/category-preview.component.jsx";
const Shop = () => 
{
    return(
    <Routes>
        <Route index element={<CategoryPreview /> } />
        <Route path=":category" element={<CategoryView />}/>
        
    </Routes>
    );
        };
        
  


export default Shop;