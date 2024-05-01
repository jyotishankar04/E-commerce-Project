import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MenuOpen } from "../utils/Context";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { LiaLinkedin } from "react-icons/lia";
import { FaLinkedin } from "react-icons/fa6";

function Menu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuOpen);
  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div
      className={`w-full h-screen pt-7 z-40 absolute ${
        isMenuOpen ? "top-[0]" : "-top-[150%]"
      }  bg-slate-400 left-0 flex flex-col duration-500 items-center justify-start `}
    >
      <Link
        className="absolute top-10 right-[80px] font-bold"
        onClick={handleClick}
      >
        <RxCross2 className="text-3xl" />
      </Link>
      <Link
        to={"/"}
        className="text-4xl font-semibold  text-purple-950 basis-[20%] flex justify-center items-center"
        onClick={handleClick}
      >
        Shopio
      </Link>
      <ul className="flex flex-col text-3xl items-center text-gray-800 font-bold basis-[50%] justify-evenly ">
        <li className="hover:text- hover:text-purple-900 ">
          <NavLink
            to={"/"}
            onClick={handleClick}
            className={
              location.pathname === "/" ? "text-red-800" : "text-gray-800"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="hover:text- hover:text-purple-900 ">
          <NavLink
            className={
              location.pathname === "/products"
                ? "text-red-800"
                : "text-gray-800"
            }
            to={"/products"}
            onClick={handleClick}
          >
            Products
          </NavLink>
        </li>
        <li className="  flex justify-center items-center gap-5 ">
          <a href="https://instagram.com/suvam.io" target="_blank">
            <FaInstagram className=" hover:text-purple-900 cursor-pointer" />
          </a>
          <a href="mailto:patrajyotishankar@gmail.com" target="_blank">
            <IoIosMail className=" hover:text-purple-900 cursor-pointer" />
          </a>
          <a href="https://github.com/jyotishankar04" target="_blank">
            <FaGithub className=" hover:text-purple-900 cursor-pointer" />
          </a>
          <a href="https://linkedin.com/in/jyotishankar-patra" target="_blank">
            <FaLinkedin className=" hover:text-purple-900 cursor-pointer" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
