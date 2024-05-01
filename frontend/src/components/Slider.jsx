import React, { useContext, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { sliderContext, sliderMoveContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Slider() {
  const sliderDetails = [
    {
      id: 32,
      title: "Surface Studio",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio earumcorporis facere perferendis sit nostrum, voluptatem minima. Tempore",
      image:
        'bg-[url("https://i.ibb.co/3MMd1XV/surface-c-LTHKm-QS0z-I-unsplash.jpg")]',
    },

    {
      id: 15,
      title: "Logitech Mouse",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio earumcorporis facere perferendis sit nostrum, voluptatem minima. Tempore",
      image:
        'bg-[url("https://i.ibb.co/Xy1cSBj/homescreenify-b18-Zs-VX464c-unsplash.jpg")]',
    },
    {
      id: 33,
      title: "Apple Studio",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio earumcorporis facere perferendis sit nostrum, voluptatem minima. Tempore",
      image:
        'bg-[url("https://i.ibb.co/BKkjDTH/photo-1692355120411-745955d74c22-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg")]',
    },
  ];
  const [translateEl, setTranslateEl] = useState("translate-x-[0]");
  const [sliderMove, setSliderMove] = useState(0);
  const [sliderCount, setSliderCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderCount((prevCount) => prevCount + 1);
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [sliderDetails.length]);

  useEffect(() => {
    if (sliderCount == 0) {
      setTranslateEl("-translate-x-[0%]");
    } else if (sliderCount == 1) {
      setTranslateEl("-translate-x-[34%]");
    } else if (sliderCount == 2) {
      setTranslateEl("-translate-x-[67%]");
    }

    if (sliderCount < 0) {
      setSliderCount(sliderDetails.length - 1);
    } else if (sliderCount >= sliderDetails.length) {
      setSliderCount(0);
    }
  }, [sliderCount]);
  return (
    <sliderContext.Provider value={{ sliderCount, setSliderCount }}>
      <sliderMoveContext.Provider value={{ sliderMove, setSliderCount }}>
        <div className="slider  overflow-hidden  gap-5 relative h-[80vh] ">
          <Button />
          <div
            className={`flex  h-full absolute left-0 top-0 justify-center items-center ${translateEl} duration-700`}
          >
            {/* * // */}
            {sliderDetails.map((item, index) => (
              <SliderBox key={index} item={item} />
            ))}
          </div>
        </div>
      </sliderMoveContext.Provider>
    </sliderContext.Provider>
  );
}

function Button() {
  const { sliderCount, setSliderCount } = useContext(sliderContext);
  return (
    <div className="buttons absolute  text-gray-800 text-5xl flex w-full justify-between items-center h-full p-10 ">
      <FaAngleLeft
        className="bg-white  z-10 rounded-full flex justify-center items-center p-2 cursor-pointer"
        onClick={() => setSliderCount(sliderCount - 1)}
      />
      <FaAngleRight
        className="bg-white rounded-full flex justify-center items-center p-2 cursor-pointer hover:shadow-2xl z-10 shadow-slate-800"
        onClick={() => setSliderCount(sliderCount + 1)}
      />
    </div>
  );
}
function SliderBox({ item }) {
  // const { sliderCount, setSliderCount } = useContext(sliderContext);
  // const { sliderMove, setSliderMove } = useContext(sliderMoveContext);
  return (
    <div className={`  ${item.image} w-screen h-[100%]    bg-center bg-cover `}>
      <div className="text-gray-100 flex flex-col items-start justify-center w-[50%] h-full gap-7 pl-[10%] ">
        <h1 className="text-4xl ">{item.title}</h1>
        <h1 className="text-xs pr-36">{item.description}</h1>
        <Link
          to={`/product/${item.id}`}
          className="z-60 text-md bg-white py-2 px-5 text-gray-800 font-semibold rounded-sm cursor-pointer hover:bg-gray-200 hover:translate-x-3 duration-200"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}

export default Slider;
