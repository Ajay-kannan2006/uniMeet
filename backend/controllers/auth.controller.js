const  User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const maxAge = 7 * 24 * 60 * 60;

function generateToken(id){
    return jwt.sign({ id }, process.env.JWT, { expiresIn: maxAge });
};

const checkAlreadyLoggedIn = async (req, res) => {
    const token = req.cookies['jwt'];
    console.log(req.cookies);
    if (!token) {
        return res.status(401).json({ error: "No token, not Authenticated" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT);
        return res.status(200).json({ message: "User Already Logged In" });
    }
    catch (err) {
        if (err.name == "TokenExpiredError") {
            return res.status(401).json({ error: "User token expired" });
        } else if (err.name == "JsonWebTokenError") {
            return res.status(401).json({ error: 'Invalid Credential' });
        }
    }
}

const signup = async (req, res) => {
    try {
        const {username, email, password } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email are Missing' });
        }
        if (!username) {
            return res.status(400).json({ error: 'User Name are Missing' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password Fields are Missing' });
        }
        const existingUser = await User.findOne({ email });
        console.log(1);
        if (existingUser) {
            return res.status(409).json({ error: 'User Already Exist' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(1);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        console.log(1);

        newUser.save();
console.log(1);
        const token = generateToken(newUser._id);
        console.log(1);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge:maxAge,
        });
console.log(1);
        return res.status(201).json({ message: 'User Registered Successfully'});
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Problem in Signing up' });
    }
}


const login = async (req,res) => {
    
    
    try {
        const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is Missing' });
    }
    
    if (!password) {
        return res.status(400).json({ error: 'Password is Missing' });
    }
    
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ error: "User Doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Pasword Doesn't Match" });
        }

        const token = generateToken(userData._id);

        res.cookie('jwt', token, {
            httpOnly:true,
            maxAge: maxAge,
        });

        return res.status(200).json({ message: "User Logged In Successfully" });


    } catch (err) {
        console.log(err);
        
        return res.status(400).json({ error: err });
    }
}

module.exports = { signup,checkAlreadyLoggedIn,login };