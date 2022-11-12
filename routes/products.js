const express = require("express");
const multer = require("multer");
const routes = express.Router();
const Store = require("../funciones/storage");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, "" + Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });
const dbManager = new Store("./data.json");
routes.use(express.json());
routes.post("/addproduct", upload.single("url"), async (req, res) => {
  const { title, url, price } = req.body;
  const response = await dbManager.addProduct(title, url, price, this.version);
  console.log(req.file);
  res.send(response);
});
module.exports = routes;
