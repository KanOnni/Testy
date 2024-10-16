const mongoose = require("mongoose");
const { Order } = require("./schemas/orderSchema");

/* List all */
async function getAllOrders(params) {
    const allOrders = await Order.find();
    return allOrders.map((o) => {
        return {
            id: o._id.toHexString(),
            userId: o.userId,
            date: o.date,
            status: o.status,
            address: o.address
        };
    });
}

/* Save */
async function saveOrder(o) {
    console.log("Here have order: ", JSON.stringify(o));
    const saveOrder = await Order.create({
            userId: o.userId,
            date: o.date,
            status: o.status,
            address: o.address
    });
    console.log(saveOrder);
    const orderId = saveOrder._id.toHexString();
    return {
        id: orderId,
        userId: o.userId,
        date: o.date,
        status: o.status,
        address: o.address
    };
}

/* Delete */
/* Taso 1 */
async function deleteOrder(id) {
    try {
        const x = await Order.remove({ _id: mongoose.Types.ObjectId(id) });
        if (x && !x.deletedCount) {
            throw new Error("No Orders were deleted");
        }
        console.log("Removed: ", x);
    } catch (error) {
        console.error("Removal of object failed: ", error);
        throw error;
    }
}

module.exports = { getAllOrders, saveOrder, deleteOrder };