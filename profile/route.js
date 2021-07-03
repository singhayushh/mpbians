const express = require("express");
const Router = express();
const p = require("./controller");
const auth = require("../support/auth");

Router.get("/sample", auth("allow"), p.Sample);
Router.get("/me", auth(), p.Profile);
Router.get("/edit", auth(), p.RenderEdit);
Router.post("/edit", auth(), p.Edit);

module.exports = Router;
