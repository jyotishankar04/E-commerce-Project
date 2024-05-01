import { createContext } from "react";
import App from "../App";
import Slider from "react-slick";
import AllProduct from "../components/AllProduct";

const MenuOpen = createContext({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

const sliderContext = createContext({});
const sliderMoveContext = createContext({});
const allProductContext = createContext({});

export { MenuOpen, sliderContext, sliderMoveContext, allProductContext };
