const express = require("express");

const router = express.Router();

const controller = require("../controller/items");

router
    .route('/items')
    .get(controller.getItems)

router
    .route('/items/:id')
    .get(controller.getItemInfo)


module.exports = router;