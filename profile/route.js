const express = require("express");
const Router = express();
const p = require("./controller");
const auth = require("../support/auth");

const multer = require("multer");
const { storage } = require("../support/cloudinary");
const upload = multer({ storage });

Router.get("/sample", auth("allow"), p.Sample);
Router.get("/me", auth(), p.Profile);
Router.get("/edit", auth(), p.RenderEdit);
Router.post("/search", auth(), p.Search);
Router.post("/edit", auth(), p.Edit);
Router.post("/picture", upload.single('file'), auth(), p.EditPicture);

module.exports = Router;
