const express = require("express");
const productsController = require("../controllers/product");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Product Routes
router.post("/", verify, verifyAdmin, productsController.addProduct); 

router.post('/search-by-price', productsController.searchProductsByName); 

router.get('/all', verify, verifyAdmin, productsController.getAllProducts); 

router.get('/active', productsController.getAllActiveProducts); 

router.get("/:id", productsController.retrieveSpecificProduct); 

router.patch("/:id/update", verify, verifyAdmin, productsController.updateProduct); 

router.patch("/:id/archive", verify, verifyAdmin, productsController.archiveProduct); 

router.patch("/:id/activate", verify, verifyAdmin, productsController.activateProduct);

module.exports = router;
