import Users from "../model/user.js";
import bycrypt from "bcrypt";


export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const Register = async (req, res) => {
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