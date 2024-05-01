const mongo = require("mongoose");

/**
 *id: Integer
 * title: String
 * Description: String
 *  category: String
    price : integer
    image: url
 *imageUrl: string
 */

//mongodb+srv://jyotishankarlearn:Subham%40mongo@cluster0.ldfa6vq.mongodb.net/E-commerce-Store
mongo.connect(
  "mongodb+srv://jyotishankarlearn:Subham%40mongo@cluster0.ldfa6vq.mongodb.net/E-commerce-Store"
);
const productSchema = mongo.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: String,
  imageUrl: String,
  isCartAdded: Boolean,
});

const products = mongo.model("products", productSchema);

module.exports = {
  products,
};
