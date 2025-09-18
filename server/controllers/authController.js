const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req,res)=>{
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ error: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password:hashed, role });
    res.json({ message:"User registered", user });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ error:"User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({ error:"Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:"7d" });
    res.json({ token, user });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    const newToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ token: newToken, user: { id: user._id, role: user.role, name: user.name } });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};
