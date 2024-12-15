const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE Product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qPrice = req.query.price;
  const qColor = req.query.color;
  const qTitle =req.query.title;
  console.log(qPrice)
  console.log(qCategory)
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory && qPrice && qColor && qTitle) {
      console.log("here")
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },price :{
          $eq: qPrice,
        },color :{
          $eq: qColor,
        },title :{
          $eq: qTitle,
        }

      });
    } else if (qCategory){
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
    }else if(qPrice){
            products = await Product.find({      
        price :{
        $eq: qPrice,
      }});
      
    }
    else if(qColor){
      products = await Product.find({      
  color :{
  $eq: qColor,
}});

}else if(qTitle){
  products = await Product.find({      
title :{
$eq: qTitle,
}});

}
    else {
      products = await Product.find();
    }   

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}); 

module.exports = router;