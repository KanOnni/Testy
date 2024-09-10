const express = require("express");
const app = require("../App");
const { OrderItem } = require("../mongo/schemas/orderItemSchema");
const router = express.Router(); //toimii ilman
const orderItem = require("../mongo/orderTest");

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
        const body = req.body;
        console.log("🚀 ~ file: index.js ~ line 13 ~ req.body", req.body);
        
        const something = await orderItem.saveOrder({
            userId: i.userId,
            date: i.date,
            status: i.status
        });

        console.log("Item awaiting save", something);
        console.log("Outcome: " + JSON.stringify(body));
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
        const test = await order.deleteorder(orderItemId);
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

        //Updating order
        const updateOrderItem = await Order.findByIdAndUpdate(
            id, 
            { orderId },
            { productId }
        );
        // Anwser to update
        res.json({ orderItem: updateOrderItem })
    } catch (error) {
        console.error("Error in updating Orders ", error);
        res.status(500).json({ error: "Order update failed" })
    }
});

module.exports = router;