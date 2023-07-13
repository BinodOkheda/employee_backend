
const express = require("express");
const userRouter = express.Router()
require("dotenv").config()
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Signup API
userRouter.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
  console.log(existingUser)
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  
  // Login API
userRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'secret_key');
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  });


module.exports={userRouter}