import axios from "axios";
import { Link } from "react-router-dom";

function ProductItem({
  image,
  description,
  title,
  price,
  id,
  isCartAdded,
  getAllProduct,
}) {
  async function handleClickOnAddToCart() {
    let data = {
      id,
    };

    let response = await axios.put("http://localhost:3000/addToCart", data);
    getAllProduct();
  }

  return (
    <div className="w-64  p-2 bg-zinc-100 rounded-sm">
      <Link
        to={`/product/${id}`}
        className={`h-52 bg-center pointer overflow-hidden flex justify-center items-center bg-cover rounded-sm cursor-pointer`}
      >
        <img src={image} alt="" className="w-full " />
      </Link>
      <div className="details flex flex-col items-center justify-start ">
        <h1 className="text-2xl text-blue-950 font-semibold py-2 text-center">
          {title}
        </h1>
        <p className="text-xs text-center text-gray-700 pb-2">{description}</p>
      </div>
      <div className="price flex justify-between items-center text-xl px-4 py-1 font-semibold text-gray-900 ">
        <h3>&#x20b9; {price}</h3>
        <button
          className={` text-sm z-10 ${
            isCartAdded ? "bg-red-600" : "bg-gray-900"
          } text-white px-3 py-2 rounded-md z-`}
          onClick={handleClickOnAddToCart}
        >
          {isCartAdded ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
