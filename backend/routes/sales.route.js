const express = require("express");
const salesController = require("../controllers/sales.controller.js");

const router = express.Router();

router
  .route("/")
  .get(salesController.getSales)
  .post(salesController.createSale);

router.route("/filters").get(salesController.getFilterValues);

module.exports = router;
