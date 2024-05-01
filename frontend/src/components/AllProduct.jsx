import ProductItem from "./ProductItem";
import { allProductContext } from "../utils/Context";
import { useEffect, useRef, useState } from "react";
import axios, { all } from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

function AllProduct() {
  const [allProduct, setAllProducts] = useState([]);
  const [categorys, setCategory] = useState(null);
  const selectRef = useRef();
  async function handleProductByCategory() {
    let category = selectRef.current.value;
    if (category === "allProducts") {
      getAllProduct();
    } else {
      const response = await axios.get(
        `http://localhost:3000/products/${category}`
      );
      let dataa = response.data;
      // console.log(dataa);
      setAllProducts(dataa.data);
    }
  }
  async function getAllProduct() {
    const response = await axios.get("http://localhost:3000/products");
    let dataa = response.data;
    setAllProducts(dataa.data);
  }

  async function getCategory() {
    let arr = allProduct.map((val) => {
      return val.category;
    });
    let arrr = await Array.from(new Set(arr));
    setCategory(arrr);
    // console.log(arrr);
  }

  useEffect(() => {
    if (selectRef.current.value !== "allProducts") {
      handleProductByCategory();
    } else {
      getAllProduct();
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, [allProduct]);
  // console.log(categorys);
  return (
    <allProductContext.Provider
      value={{
        allProduct,
        setAllProducts,
      }}
    >
      <div className="w-full gap-5 p-5 flex justify-end pr-[100px] items-center">
        <select
          name="filter"
          id="filter"
          ref={selectRef}
          className="py-2 px-7  text-center rounded-md outline-none text-gray-800"
        >
          <option value="allProducts">All products</option>
          {Array.isArray(categorys)
            ? categorys.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })
            : "No categorys"}
        </select>
        <button
          className="px-7 rounded-md py-2 bg-gray-800 text-white"
          onClick={handleProductByCategory}
        >
          Apply Filter
        </button>
      </div>
      <div className=" p-5 flex justify-center items-start  flex-wrap gap-5">
        {allProduct.length > 0 ? (
          allProduct.map((val, index) => (
            <ProductItem
              price={val.price}
              title={val.title}
              description={val.description}
              id={val.id}
              isCartAdded={val.isCartAdded}
              image={val.imageUrl}
              key={index}
              getAllProduct={getAllProduct}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </allProductContext.Provider>
  );
}

export default AllProduct;
