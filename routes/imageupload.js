const Product = require("../models/Product");
const router = require("express").Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const cloudniary = require('cloudinary').v2;

    // Configuration
    cloudniary.config({ 
        cloud_name: 'damtnwjsu', 
        api_key: '937734115448958', 
        api_secret: 'LkuUkV3eqhtLic06juyKfsAfR7k' // Click 'View API Keys' above to copy your API secret
    });

router.post('/upload', upload.single('file') , async (req, res) => {
            
      const file = req.file;
      const productId =req.body.productId;
     
      const product = await Product.findById(productId);
      if(!product)
        {
        throw Error("product not found ")
        }
        const result = await cloudniary.uploader.upload(file.path, {
            folder: 'picancci', // Optional: Specify folder in Cloudinary
          });
        product.img = result.secure_url ;
        await product.save();
        res.json({massage: "photo uploaded"}) ;
    });
    module.exports = router; 