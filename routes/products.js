const express = require("express");
const multer = require("multer");
const routes = express.Router();
const Store = require("../funciones/storage");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "" + Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });
const dbManager = new Store("./data.json");
routes.use(express.json());
routes.post("/addproduct", upload.single("url"), async (req, res) => {
  const { title, price } = req.body;
  const response = await dbManager.addProduct(
    title,
    "./images/" + req.file.filename,
    price,
    this.version
  );
  res.send(response);
});
routes.get("/getProducts", async (req, res) => {
  const response = await dbManager.getAll(this.version);
  res.render("view", { products: response, contenido: response.length > 0 });
});
module.exports = routes;
