import { IoMenu } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { MenuOpen, allProductContext } from "../utils/Context";
import { useContext, useEffect, useState } from "react";
import { GrGithub } from "react-icons/gr";
import axios, { all } from "axios";
function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuOpen);
  //   console.log(isMenuOpen);

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="w-full p-[15px]  flex justify-around items-center">
      <div className="flex items-end gap-4 text-gray-700 text-3xl">
        <Link className="text-4xl font-semibold" to={"/"}>
          Shopio
        </Link>
        <IoMenu
          className="cursor-pointer"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        />
      </div>
      <div className="searchbar flex items-center border-zinc-100 border-2 bg-zinc-100 rounded-md p-2 basis-[50%]">
        <input
          type="text"
          placeholder="Search product & brand"
          className="w-[90%]  bg-zinc-100 outline-none text-gray-600"
        />
        <IoSearchOutline className="text-2xl text-gray-700 cursor-pointer basis-[10%]  " />
      </div>
      <div className="buttons flex items-center justify-end gap-6 text-sm text-gray-600">
        <a
          href="https://github.com/jyotishankar04"
          target="_blank"
          className="hover:text-gray-950 text-3xl"
        >
          <GrGithub />
        </a>
        <NavLink
          to={"/cart"}
          className="relative hover:text-gray-950 text-3xl "
        >
          <FaCartArrowDown />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
