const mongoose = require("mongoose");
const { OrderItem } = require("./schemas/orderItemSchema");

/* List all */
async function getAllOrderItems(params) {
    const allOrderItems = await OrderItem.find();
    return allOrderItems.map((i) => {
        return {
            id: i._id.toHexString(),
            orderId: i.orderId,
            productId: i.productId,
            price: i.price,
            discount: i.discount,
            amount: i.amount
        };
    });
}

/* Save */
async function saveOrderItem(i) {
    console.log("Here have item: ", JSON.stringify(i));
    const saveOrder = await OrderItem.create({
            orderId: i.orderId,
            productId: i.productId,
            price: i.price,
            discount: i.discount,
            amount: i.amount
    });
    console.log(saveOrder);
    const orderItemId = saveOrder._id.toHexString();
    return {
        id: orderItemId,
        orderId: i.usorderId,
        productId: i.productId,
        price: i.price,
        discount: i.discount,
        amount: i.amount
    };
}

/* Delete */
/* Taso 1 */
async function deleteOrderItem(id) {
    try {
        const x = await OrderItem.remove({ _id: mongoose.Types.ObjectId(id) });
        if (x && !x.deletedCount) {
            throw new Error("No Items were deleted");
        }
        console.log("Removed: ", x);
    } catch (error) {
        console.error("Removal of object failed: ", error);
        throw error;
    }
}

module.exports = { getAllOrderItems, saveOrderItem, deleteOrderItem };