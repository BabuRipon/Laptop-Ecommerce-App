const express = require("express");
const route = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, orderStatus } = require("../controllers/admin");

// routes
route.get("/admin/orders", authCheck, adminCheck, orders);
route.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = route;