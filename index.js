const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const categoryRoutes = require("./Routes/Category.routes");
const blogRoutes = require("./Routes/Blog.routes");
const authRoutes = require("./Routes/Auth.routes");
const client = require("./Redis/redisClient");
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", authRoutes);


app.get("/", (req, res)=>{
    res.send("Wake Up my man");
});



(async ()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://eren28:28eren57@cluster0.n2gcnhz.mongodb.net/blogDatabases?retryWrites=true&w=majority&appName=Cluster0");
        if (connection.STATES.connected == 1) {
            console.log("Connection is Successfully");
            app.listen(process.env.PORT, ()=>{
                console.log(`Listening a PORT ${process.env.PORT}`);
            })
        } else{console.log("Dude, There was a connection problem...");}
    } catch (error) {
        console.log("ERRORRR");
    }
})();