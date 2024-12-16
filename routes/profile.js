const router = require("express").Router();
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

router.put("/:id",  [
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('phone')
      .matches(/^01[0125]\d{8}$/)
      .withMessage(
        'Phone number must start with 010, 011, 012, or 015 and be 11 digits long'
      ),
   
  ],
],async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    try {
      const userId = req.params.id;
      const userData = req.body;
    
      const updatedUser = await User.findByIdAndUpdate(userId, {$set:userData},{new:true});
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
module.exports=router ;

