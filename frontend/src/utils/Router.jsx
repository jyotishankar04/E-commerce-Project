import { Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import ProductDetails from "../components/ProductDetails";
import Slider from "react-slick";
import AllProduct from "../components/AllProduct";
import Home from "../components/Home";
import Cart from "../components/Cart";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<AllProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        {/* <Route path="/menu" element={<Menu />}></Route> */}
      </Routes>
    </>
  );
}

export default Router;
