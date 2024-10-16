const express = require("express");
const app = require("../App");
const { OrderItem } = require("../mongo/schemas/orderItemSchema");
const router = express.Router(); //toimii ilman
const orderItem = require("../mongo/orderItemTest");

/* GET home page */
router.get("/", async function (req, res, next) {
    console.log(orderItem);
    const list = await orderItem.getAllOrders();
    console.log(list);
    res.json({ list });
});

/* POST home page or POST index root */
router.post("/", async function (req, res, next) {
    /* Taso 0 */
    try {
        const i = req.body;
        console.log("🚀 ~ file: index.js ~ line 13 ~ req.body", req.body);
        
        const something = await orderItem.saveOrderItem({
            orderId: i.orderId,
            productId: i.productId,
            price: i.price,
            discount: i.discount,
            amount: i.amount
        });

        console.log("Item awaiting save", something);
        console.log("Outcome: " + JSON.stringify(i));
        res.json({ status: "ok", orderItem: something })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});

/* routter delete */
router.delete("/:id", async function (req, res, next) {
    try {
        const orderItemId = req.params.id;
        console.log("~ file: index.js ~ line 35 ~ orderItemId", orderItemId);
        const test = await order.deleteorderitem(orderItemId);
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
        const { orderId } = req.body;
        const { productId } = req.body;
        const { price } = req.body;
        const { discount } = req.body;
        const { amount } = req.body;

        //Updating orderitem
        const updateOrderItem = await OrderItem.findByIdAndUpdate(
            id, 
            { orderId },
            { productId },
            { price },
            { discount },
            { amount }
        );
        // Anwser to update
        res.json({ orderItem: updateOrderItem })
    } catch (error) {
        console.error("Error in updating Orders ", error);
        res.status(500).json({ error: "Order update failed" })
    }
});

module.exports = router;