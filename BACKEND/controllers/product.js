const Product = require("../models/Product");
const User = require("../models/User");
const { errorHandler } = require("../auth");

// Add a new product
module.exports.addProduct = (req, res) => {
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    Product.findOne({ name: req.body.name }).then(existingProduct => {
        if (existingProduct) {
            return res.status(409).send({ message: 'Product already exists' });
        } else {
            return newProduct.save()
                .then(result => res.status(201).send({
                    success: true,
                    message: 'Product added successfully',
                    result: result
                }))
                .catch(error => errorHandler(error, req, res));
        }
    }).catch(error => errorHandler(error, req, res));
};

// Get all products
module.exports.getAllProducts = (req, res) => {
    return Product.find({})
        .then(result => {
            if (result.length > 0) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send({ message: 'No products found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

// Get all active products
module.exports.getAllActiveProducts = (req, res) => {
    Product.find({ isActive: true })
        .then(result => {
            if (result.length > 0) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send({ message: 'No active products found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

// Retrieve a specific product by ID
module.exports.retrieveSpecificProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                return res.status(200).send(product);
            } else {
                return res.status(404).send({ message: 'Product not found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

// Update a product by ID
module.exports.updateProduct = (req, res) => {
    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };

    Product.findByIdAndUpdate(req.params.id, updatedProduct)
        .then(product => {
            if (product) {
                res.status(200).send({ success: true, message: 'Product updated successfully' });
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

// Archive a product by ID (set isActive to false)
module.exports.archiveProduct = (req, res) => {
    let updateActiveField = { isActive: false };

    Product.findByIdAndUpdate(req.params.id, updateActiveField)
        .then(product => {
            if (product) {
                if (!product.isActive) {
                    return res.status(200).send({ message: 'Product already archived', product: product });
                }
                return res.status(200).send({ success: true, message: 'Product archived successfully' });
            } else {
                return res.status(404).send({ message: 'Product not found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

// Activate a product by ID (set isActive to true)
module.exports.activateProduct = (req, res) => {
    let updateActiveField = { isActive: true };

    Product.findByIdAndUpdate(req.params.id, updateActiveField)
        .then(product => {
            if (product) {
                if (product.isActive) {
                    return res.status(200).send({ message: 'Product already activated', product: product });
                }
                return res.status(200).send({ success: true, message: 'Product activated successfully' });
            } else {
                return res.status(404).send({ message: 'Product not found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

// Search for products by name
module.exports.searchProductsByName = async (req, res) => {
    try {
        const { productName } = req.body;

        const products = await Product.find({
            name: { $regex: productName, $options: 'i' }
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
