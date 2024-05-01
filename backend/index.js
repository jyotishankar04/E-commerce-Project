const express = require("express");
const app = express();
const { updateProducts, setProducts } = require("./types");
const { products } = require("./db");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/product/post", async (req, res) => {
  const createPayload = req.body;

  // console.log(createPayload);
  const parsedPayload = setProducts.safeParse(createPayload);
  // console.log(parsedPayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
  }
  const givenID = createPayload.id;
  const existStatus = await products.find({ id: givenID });
  if (existStatus.length > 0) {
    return res.json({
      msg: "Can't save, Product already exists",
    });
  }

  //Put this to mongodb
  const response = await products.create({
    id: createPayload.id,
    title: createPayload.title,
    description: createPayload.description,
    category: createPayload.category,
    price: createPayload.price,
    imageUrl: createPayload.imageUrl,
    isCartAdded: false,
  });
  if (response) {
    res.json({
      msg: "Product saved Successfully",
    });
  } else {
    res.status(404).json({
      msg: "product not created",
    });
  }
});

app.get("/products", async (req, res) => {
  const data = await products.find({});
  if (data) {
    res.json({
      data,
    });
  } else {
    res.status(411).json({
      msg: "Error in fetching data",
    });
  }
});

app.get("/products/:category", async (req, res) => {
  const category = req.params.category;
  const filteredProducts = await products.find({
    category,
  });
  //   const response = await products.find({});
  if (filteredProducts.length > 0) {
    res.json({
      data: filteredProducts,
    });
  } else {
    res.status(411).json({
      msg: "Error in fetching data",
    });
  }
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const filteredProducts = await products.findOne({
    id,
  });
  // console.log(filteredProducts);
  //   const response = await products.find({});
  if (filteredProducts) {
    res.json({
      data: filteredProducts,
    });
  } else {
    res.status(411).json({
      msg: "Error in fetching data",
    });
  }
});

app.put("/update", async (req, res) => {
  const updatePayload = req.body;
  // console.log(updatePayload);

  // if (!parsedPayload.success) {
  //   return res.status(400).json({
  //     msg: "You sent wrong inputs",
  //   });
  // }
  const givenID = req.body.id;
  const existStatus = await products.find({ id: givenID });
  if (existStatus.length == 0) {
    return res.json({
      msg: "Product not found",
    });
  }
  try {
    const response = await products.updateOne(
      {
        id: req.body.id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
      }
    );

    if (response) {
      // Added a return statement before res.json()
      return res.json({
        // Added return
        msg: "Product updated successfully",
      });
    } else {
      // Changed status code to 404 and added a return statement
      return res.status(404).json({
        // Changed status code and added return
        msg: "product not found",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    // Changed status code to 500 and added a return statement
    return res.status(500).json({
      // Changed status code and added return
      msg: "Failed to update product",
    });
  }
});

app.get("/getLastId", async (req, res) => {
  const lastID = await products.findOne().sort({ id: -1 });
  res.json({
    msg: lastID,
  });
});

app.put("/cartAdd", async (req, res) => {
  const collection = "E-commerce-Store";
  const response = await products.collection.updateMany(
    {},
    { $set: { isCartAdded: false } }
  );
  console.log(response);
  if (response.modifiedCount > 0) {
    // Send a JSON response indicating that the documents were updated
    res.json({
      msg: "updated",
    });
  } else {
    res.json({ mag: "cant update" });
  }
});

app.put("/addToCart", async (req, res) => {
  // let createPayload = req.body;
  const collection = "E-commerce-Store";
  let givenID = req.body.id;
  let currentStatus = await products.findOne(
    { id: givenID },
    {
      isCartAdded: 1,
      _id: 0,
    }
  );
  if (!currentStatus) {
    return res.status(500).json({
      mag: "product not found",
    });
  }

  const response = await products.collection.updateOne(
    {
      id: givenID,
    },
    {
      $set: { isCartAdded: !currentStatus.isCartAdded },
    }
  );
  // console.log(response);
  if (response.modifiedCount > 0) {
    if (currentStatus.isCartAdded) {
      return res.json({
        msg: "Removed from cart",
      });
    } else {
      return res.json({
        msg: "Added to cart",
      });
    }

    res.status(500).json({
      msg: "Cannot add to cart",
    });
  }
});

app.get("/cartItems", async (req, res) => {
  const cartProducts = await products.find({ isCartAdded: true });
  // console.log(cartProducts);
  if (cartProducts.length == 0) {
    return res.json({
      msg: "Cart is empty",
    });
  }
  res.json({
    data: cartProducts,
    msg: "here is data",
  });
});

app.listen("3000", () => {
  console.log("App is running on port number 3000");
});
