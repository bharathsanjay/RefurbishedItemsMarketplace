const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware')
// new user registration

router.post('/register', async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({email: req.body.email});
        console.log(req.body.email);
        console.log(req.body.name);
        console.log(req.body.password);
        if (user) {
            throw new Error('User already exists');
            // return res.send({success: false,
            //                 message:'User already exisits' });
        }
        // hash password
        console.log("here");
        const salt = await bcrypt.genSalt(10);
        console.log("there");
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        console.log(newUser);
        await newUser.save();
        res.send({
                     success: true,
                     message: "User Created Successfully",
                 });
    } catch (error) {
        res.send(
            {
                sucess: false,
                message: error.message
            }
        )
    }
});

// User Login

router.post('/login', async (req, res) => {
    try {
        // user login
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            throw new Error("User not found");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            throw new Error("Invalid Passwrd!!")
        }

        const token = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: "1d"});

        return res.send({
                            success: true,
                            message: "Logged in Successfully",
                            data: token
                        });

    } catch (error) {
        res.send({
                     success: false,
                     message: error.message,
                 });
    }
});

// get current user

router.get("/get-current-user", authMiddleware,async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
                     success: true,
                     message: "user fetched successfully",
                     data: user,
                 });
    } catch (error) {
        res.send(
            {
                sucess: false,
                message: error.message
            }
        )
    }
});

module.exports = router;