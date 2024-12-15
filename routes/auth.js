const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const { check } = require('express-validator');
const { validationResult } = require('express-validator');


//register 

let RegUser = 

router.post ("/register",     [
    [
      check('username', 'Name is required').not().isEmpty(),
      check('email', 'please include a valid email').isEmail(),
      check('phone')
        .matches(/^01[0125]\d{8}$/)
        .withMessage(
          'Phone number must start with 010, 011, 012, or 015 and be 11 digits long'
        ),
      check(
        'password',
        'Please enter a password with at least 8 chars'
      ).isLength({
        min: 8,
      }),
      check(
        'password',
        'Password must contain at least one lowercase letter'
      ).matches(/[a-z]/),
      check(
        'password',
        'Password must contain at least one uppercase letter'
      ).matches(/[A-Z]/),
      check('password', 'Password must contain at least one number').matches(
        /\d/
      ),
    ],
],
    async(req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const newUser =new User ({
        username : req.body.username,
        email : req.body.email,
        phone : req.body.phone, 
        password :CryptoJs.AES.encrypt(
            req.body.password,
            process.env.pass_sec
        ).toString(),
    });
    try {
        const savedUser =await newUser.save();
        res.status(201).json(savedUser);  
    }catch(err){
         res.status(500).json(err);
    }
    });

// login
router.post("/login" , async (req,res)=>{
try {
    const user = await User.findOne({username:req.body.username});
    !user && res.status(401).json("wrong credentials");

    const hashedPassword = CryptoJs.AES.decrypt(
        user.password,
        process.env.pass_sec
    );
    const orginalpassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    orginalpassword !== req.body.password && 
    res.status(401).json("wrong credentials");

const accesstoken = jwt.sign({
id: user._id,
isAdmin: user.isAdmin,
}
,process.env.jwt_sec,
{expiresIn:"3d"}
);

    const{password,...others} =user._doc;
    res.status(200).json({...others,accesstoken});
}catch(err){
    res.status(500).json(err);
}
});

// //logout 
// exports.logout = (req, res) => {
//   res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: 'success' });
// };


module.exports=router 
