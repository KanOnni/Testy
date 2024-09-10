const express = require("express");
const app = require("../App");
const { Order } = require("../mongo/schemas/orderSchema");
const router = express.Router(); //toimii ilman
const order = require("../mongo/orderTest");

/* GET home page */
router.get("/", async function (req, res, next) {
    console.log(order);
    const list = await order.getAllOrders();
    console.log(list);
    res.json({ list });
});

/* POST home page or POST index root */
router.post("/", async function (req, res, next) {
    /* Taso 0 */
    try {
        const body = req.body;
        console.log("🚀 ~ file: index.js ~ line 13 ~ req.body", req.body);
        
        const something = await order.saveOrder({
            userId: o.userId,
            date: o.date,
            status: o.status
        });

        console.log("Order awaiting save", something);
        console.log("Outcome: " + JSON.stringify(body));
        res.json({ status: "ok", order: something })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});

/* routter delete */
router.delete("/:id", async function (req, res, next) {
    try {
        const orderId = req.params.id;
        console.log("~ file: index.js ~ line 35 ~ orderId", orderId);
        const test = await order.deleteorder(orderId);
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
        const { userId } = req.body;
        const { date } = req.body;
        const { status } = req.body;

        //Updating order
        const updateOrder = await Order.findByIdAndUpdate(
            id, 
            { userId },
            { date },
            { status },
            { new: true }
        );
        // Anwser to update
        res.json({ order: updateOrder })
    } catch (error) {
        console.error("Error in updating Orders ", error);
        res.status(500).json({ error: "Order update failed" })
    }
});

module.exports = router;