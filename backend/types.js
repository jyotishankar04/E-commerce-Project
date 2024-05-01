const z = require("zod");

const setProducts = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.string().min(1),
  imageUrl: z.string().min(1),
});

const updateProducts = z.object({
  id: z.string(),
});

module.exports = {
  updateProducts,
  setProducts,
};
