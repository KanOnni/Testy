const express = require("express");
const app = require("../App");
const { Product } = require("../mongo/schemas/productSchema");
const router = express.Router(); //toimii ilman
const product = require("../mongo/productTest");

/* GET home page */
router.get("/", async function (req, res, next) {
    console.log(product);
    const list = await product.getAllProducts();
    console.log(list);
    res.json({ list });
});

/* POST home page or POST index root */
router.post("/", async function (req, res, next) {
    /* Taso 0 */
    try {
        const body = req.body;
        console.log("🚀 ~ file: index.js ~ line 13 ~ req.body", req.body);
        
        const something = await product.saveProduct({
            name: body.name,
            type: body.type,
            description: body.description,
            price: body.price,
            category: body.category,
            discount: body.discount,
            color: body.color,
            size: body.size,
            amount: body.amount,
            image: body.image
        });

        console.log("Product awaiting save", something);
        console.log("Outcome: " + JSON.stringify(body));
        res.json({ status: "ok", product: something })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});

/* routter delete */
router.delete("/:id", async function (req, res, next) {
    try {
        const productId = req.params.id;
        console.log("~ file: index.js ~ line 35 ~ productId", productId);
        const test = await product.deleteProduct(productId);
        res.json({ status: "ok" })
    } catch (error) {
        console.log("Error has ocured", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});

/* update router */
router.put("/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        //Updating product
        const updateProduct = await Product.findByIdAndUpdate(
            id, 
            { amount },
            { new: true },
        );
        // Anwser to update
        res.json({ product: updateProduct })
    } catch (error) {
        console.error("Error in updating products ", error);
        res.status(500).json({ error: "Products update failed" })
    }
});

module.exports = router;