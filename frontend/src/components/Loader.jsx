import React from "react";

function Loader() {
  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <div className="w-20 h-20 border-gray-900 border-[7px] rounded-full border-l-transparent border-r-transparent animate-spin duration-300"></div>
    </div>
  );
}

export default Loader;
