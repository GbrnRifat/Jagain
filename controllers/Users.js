import Users from "../model/user.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

