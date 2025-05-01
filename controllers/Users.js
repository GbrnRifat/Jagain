import Users from "../model/user.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const Register = async (req, res) => {
    if (!req.body){
        return  res.status(400).json({ message: "Data tidak boleh kosong" });
    }
    const { name, email, password } = req.body;
    const salt = await bycrypt.genSalt();
    const hashPassword = await bycrypt.hash(password, salt);
    try {
        await Users.create({
            name: name, 
            email: email,
            password: hashPassword
        });
        res.json({ message: "User Created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }   
}

export const login = async (req, res) => {
    try{
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bycrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ message: "Wrong Password" });
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '30s' });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d' });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
        });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "email not found" });
    }
}

