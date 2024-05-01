import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Router from "./utils/Router";
import { useContext, useState } from "react";
import Slider from "./components/Slider";
import Sliderr from "./components/Slider";
import AllProduct from "./components/AllProduct";
import ProductDetails from "./components/ProductDetails";
import { MenuOpen, allProductContext } from "./utils/Context";
import { Outlet } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { AllProduct } = useContext(allProductContext);
  return (
    <>
      <MenuOpen.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        <Menu />

        <Navbar />
        {/* <Home /> */}
        <Outlet />
        <div>
          {/* <Slider /> */}
          {/* <AllProduct /> */}
        </div>
        {/* <Outlet /> */}
      </MenuOpen.Provider>
      <Router />
    </>
  );
}

export default App;
