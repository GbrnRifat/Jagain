import db from "./config/database.js";
import express from "express";
import router from "./route/index.js";



const app = express();  

try {
    await db.authenticate();
    console.log("Database connected successfully.");


} catch (error) {
    console.error("Tidak bisa connect dalam database:", error); 
}

app.use(router)
app.use(express.json());

import cors from 'cors';
app.use(cors());


app.get("/", (req, res) => {
    res.send("</h1> Jagain <h1>")
    });



app.listen(5001, () => {
    console.log("Server is running on port 5001");
})
