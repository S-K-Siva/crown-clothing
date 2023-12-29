import Home from "./routes/home/home.component";
import NavBar from "./routes/navigation/navigation.component";
import { Routes,Route } from "react-router-dom";
import SignIn from "./routes/sign-in/signin.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import CategoryView from "./components/category-view/category-view.component";
import { useContext } from "react";
import { UserContext } from "./context/user.context";
const App = ()=>{
  const {currentUser} = useContext(UserContext);
  console.log(currentUser);
  return(
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />}/>
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/category" element ={<CategoryView />} />
      </Route>
      
    </Routes>
  )
}
export default App;
