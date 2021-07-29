const express = require("express");
const Router = express();
const m = require("./controller");
const auth = require("../support/auth");

Router.get("/", auth("allow"), m.Home);
Router.get("/csv", auth("allow"), m.Csv);
Router.get("/login", auth("guest"), m.Login);
Router.get("/register", auth("guest"), m.Register);
Router.get("/alumni", auth("allow"), m.Dashboard);
Router.get("/contact", auth("allow"), m.Contact);

// Router.get("/explore", m.Alumni);
Router.get("/:school_id", auth(), m.User);
Router.get("/batch/:year", auth(), m.Batch);

module.exports = Router;
