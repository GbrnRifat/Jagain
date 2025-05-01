import db from "./config/database.js";
import express from "express";
import dotenv from "dotenv";
import router from "./route/index.js";
import Users from "./model/user.js";
import cors from 'cors';
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();  

try {
    await db.authenticate();
    console.log("Database connected successfully.");
    await Users.sync({alter:true});
} catch (error) {
    console.error("Tidak bisa connect dalam database:", error); 
}

app.use(cookieParser)
app.use(router)
app.use(express.json());

app.use(cors());


app.get("/", (req, res) => {
    res.send("</h1> Jagain <h1>")
    });



app.listen(5001, () => {
    console.log("Server is running on port 5001");
})
