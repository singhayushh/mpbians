// Include packages
const express = require("express");
const cors = require("cors");
const { connect, connection } = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Initialize express
const app = express();
const port = Number(process.env.port);
const baseurl = process.env.base_url;

// Databse configuration
const uri = String(process.env.mongo_uri);
const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
connect(uri, connectOptions)
    .then()
    .catch((err) => console.log("Error:" + err));
connection.once("open", () => console.log("DB Connection established"));

// Setup middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/views"));
app.set("case sensitive routing", true);
app.set("view engine", "ejs");

// Include routes
const mainRoutes = require("./main/route");
const userRoutes = require("./user/route");
const profileRoutes = require("./profile/route");

app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);

app.get("*", (_req, res) => {
    res.render("404");
});

app.listen(port, () => console.log(`Website running at ${baseurl}:${port}`));
