// import { } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

function ProductDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const curUrl = location.pathname;
  const [isAddedMsg, setIsAddedMsg] = useState(null);
  const [isPopUpOpen, setisPopUpOpen] = useState(false);
  // const [zindex, setZindex] = useState("z-50");
  async function handlePrductById(id) {
    const response = await axios.get(`http://localhost:3000/product/${id}`);
    let dataa = response.data;
    // let tempArray = [];
    // tempArray.push(dataa.data);
    setData(dataa.data);
  }

  useEffect(() => {
    // console.log(curUrl);
    if (curUrl == `/product/${id}`) {
      document.body.style.overflow = "visible";
    }
  }, [curUrl]);

  // console.log(data);
  useEffect(() => {
    handlePrductById(id);
  }, [id]);
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    navigate(-1);
    // document.body.style.overflow = "visible";
  }
  async function handleClickOnAddCart() {
    let dataa = {
      id: data.id,
    };
    let response = await axios.put("http://localhost:3000/addToCart", data);
    setIsAddedMsg(response.data.msg);
    response = await axios.get(`http://localhost:3000/product/${id}`);
    dataa = response.data;
    setData(dataa.data);
    setisPopUpOpen(true);
    setTimeout(() => {
      setisPopUpOpen(false);
    }, 2000);
  }

  return (
    <>
      {data ? (
        <div
          className={`flex flex-col justify-start h-screen fixed items-center   top-0 bg-slate-200`}
        >
          <div
            className={`${
              isPopUpOpen ? "scale-125 block" : "scale-0 "
            }  w-60 h-10 flex font-semibold justify-center items-center text-white   ${
              isAddedMsg == "Added to cart" ? "bg-green-600" : "bg-red-600"
            }  rounded-2xl absolute left-[50%] -translate-x-[50%] bottom-20 duration-200`}
          >
            {isAddedMsg && isAddedMsg}
          </div>
          <div className="w-full text-left h-[40px] flex justify-start items-center text-gray-900">
            <button
              onClick={handleClick}
              className="bg-gray-900 text-white px-8 rounded-2xl ml-5 py-1 "
            >
              Go back
            </button>
          </div>
          <div className="mt-4 flex justify-center items-center w-full h-[calc(100vh-115px)]">
            <div className="w-full mb-8 overflow-hidden black h-full flex justify-center items-center">
              <img className="w-[80%] " src={data && data.imageUrl} alt="" />
            </div>
            <div className="w-full h-full flex pr-10 flex-col justify-start gap-4 items-start">
              <h1 className="text-4xl text-gray-900 font-semibold">
                {data && data.title}
              </h1>
              <p className="text-xs w-[70%] font-semibold  text-gray-700">
                {data && data.description}
              </p>
              <p className="text-sm w-[70%] font-semibold  text-blue-800">
                {data && data.category}
              </p>
              <h3 className="text-3xl text-gray-800 font-semibold">
                {data && data.price}
              </h3>
              <button
                onClick={handleClickOnAddCart}
                className={`px-8 py-2 rounded-sm ${
                  data && data.isCartAdded ? "bg-red-700" : "bg-green-700"
                } text-white `}
              >
                {data && data.isCartAdded ? "Remove" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductDetails;
