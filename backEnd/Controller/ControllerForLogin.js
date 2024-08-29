const jwt = require('jsonwebtoken');
const userData = require('../Moduls/User');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'dax';
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userData.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        return res.status(200).json({ status: "ok", data: token });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const registerUser = async (req, res) => {
    const { fname, lname, email, password, userType } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await userData.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await userData.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            userType,
        });

        res.status(201).json({ status: "ok", data: newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ status: "error", error: error.message });
    }
};
module.exports = { loginUser, registerUser }