import { useContext, useEffect, useState } from "react";
// import Context, { allCartContext } from "../utils/Context";

import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Cart() {
  // const { allCartItems, setAllCartItems } = useContext(allCartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allCartItems, setAllCartItems] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  // const cartAddedProduct(){

  function getThePriceArr(data) {
    const priceArr = data.map((item, index) => {
      return item.price;
    });
    // console.log(priceArr);
    return priceArr;
  }
  function calculateTotal(data) {
    const priceArr = getThePriceArr(data);
    const total = priceArr.reduce((acc, val) => acc + Number(val), 0);
    setTotalPrice(total);
  }

  async function getItems() {
    const response = await axios.get("http://localhost:3000/cartItems");
    if (response.data.msg == "Cart is empty") {
      setMsg(response.data.msg);
      //   console.log(response.data.msg);
      setAllCartItems(true);
      setTotalPrice(0);
    } else {
      setMsg(response.data.msg);
      setAllCartItems(response.data.data);
      calculateTotal(response.data.data);
    }
  }
  function handleBackBtn() {
    navigate(-1);
  }

  useEffect(() => {
    getItems();
    // console.log(priceArr);
  }, []);

  return allCartItems ? (
    <div className="w-full h-[calc(100vh-75px)]">
      <div className="h-[40px] flex justify-start items-center">
        <button
          //   onClick={handleClick}
          className="bg-gray-900 text-white px-8 rounded-2xl ml-5 py-1 "
          onClick={handleBackBtn}
        >
          Go back
        </button>
      </div>
      <div className="w-full h-[calc(100%-40px)] flex justify-around gap-2 items-start">
        <div className="basis-[60%]  h-full px-4 pb-2 flex flex-col gap-3 justify-start items-start overflow-auto">
          {allCartItems && allCartItems.length > 0 ? (
            allCartItems.map((item, index) => {
              return <CartCard key={index} item={item} getItems={getItems} />;
            })
          ) : (
            <div className="flex justify-center items-center h-full w-full text-gray-900 text-4xl font-semibold">
              {msg}
            </div>
          )}
        </div>
        <div className="basis-[40%] pr-2 h-full ">
          <CartPriceDetailsPart totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

function CartCard({ item, getItems }) {
  async function handleClickOnRemoveCart() {
    let dataa = {
      id: item.id,
    };
    let response = await axios.put("http://localhost:3000/addToCart", dataa);
    console.log(response.data.msg);
    getItems();
  }

  return (
    <div className="w-full flex justify-between items-center    bg-white rounded-md">
      <Link
        to={`/product/${item.id}`}
        className="w-24 h-24 overflow-hidden flex justify-center items-center rounded-md"
      >
        <img src={item.imageUrl} className="w-full scale-125" />
      </Link>
      <div className="flex flex-col justify-center items-center basis-[20%] text-center">
        <h1 className="font-bold">{item.title}</h1>
        <p className="text-sm text-gray-700 font-semibold">{item.category}</p>
      </div>
      <div className="flex-col text-gray-800 text-2xl flex justify-center items-center">
        <p className="text-sm">Quantity</p>
        <h1>1</h1>
      </div>
      <div className=" text-2xl flex justify-center items-center font-semibold text-blue-500">
        &#x20b9;{item.price}
      </div>
      <div className="text-red-800 text-2xl flex pr-4 justify-center items-center">
        <RiDeleteBin5Line
          className="cursor-pointer"
          onClick={handleClickOnRemoveCart}
        />
      </div>
    </div>
  );
}

function CartPriceDetailsPart({ totalPrice }) {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xs text-left w-full font-semibold uppercase">
          enter promo code
        </h1>
        <div className="flex justify-center mt-1 items-center w-full ">
          <input
            type="text"
            placeholder="Enter code"
            className="w-full p-2 outline-none border-[1px] border-r-transparent  rounded-r-none rounded-md border-gray-800"
          />
          <button
            type="submit"
            className="px-10 py-2  border-gray-800 bg-gray-800 border-[1px] rounded-r-md font-semibold text-gray-50"
          >
            Apply
          </button>
        </div>
        <div className="priceSection w-full flex flex-col gap-4 mt-5 p-2">
          <div className="w-full flex  justify-between items-center">
            <p className=" text-md ">Amount</p>
            <p className="font-semibold">{totalPrice}</p>
          </div>
          <div className="w-full flex  justify-between items-center">
            <p className=" text-md capitalize"> delivery charges</p>
            <p className="font-semibold">0</p>
          </div>
          <div className="w-full flex  justify-between items-center">
            <p className=" text-md ">Discount</p>
            <p className="font-semibold">0</p>
          </div>
        </div>
        <div className="flex justify-between px-2 mt-7  items-start w-full">
          <h1 className="text-2xl font-semibold">Estimated Total</h1>
          <p className="text-2xl font-semibold">&#x20b9;{totalPrice}</p>
        </div>
        <button className="flex items-center justify-center py-2 px-10 bg-yellow-600 text-gray-50 gap-6 hover:bg-yellow-700 mt-5 rounded-lg">
          <FaLock />
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
