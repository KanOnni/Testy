const mongoose = require("mongoose");
const { Product } = require("./schemas/productSchema");

/* List all */
async function getAllProducts(params) {
    const allProducts = await Product.find();
    return allProducts.map((p) => {
        let imageUrl = "";
        if (!p.image) {
            imageUrl = "";
        } else {
            const base64Image = p.image.toString('base64');
            imageUrl = `data:image/png;base64,${base64Image}`;
        }
        
        return {
            id: p._id.toHexString(),
            name: p.name,
            type: p.type,
            description: p.description,
            price: p.price,
            category: p.category,
            discount: p.discount,
            color: p.color,
            size: p.size,
            amount: p.amount,
            image: imageUrl
        };
    });
}

/* Save */
async function saveProduct(p) {
    console.log("Here have products: ", JSON.stringify(p));
    const saveProduct = await Product.create({
            name: p.name,
            type: p.type,
            description: p.description,
            price: p.price,
            category: p.category,
            discount: p.discount,
            color: p.color,
            size: p.size,
            amount: p.amount,
            image: p.image
    });
    console.log(saveProduct);
    const productId = saveProduct._id.toHexString();
    return {
        id: productId,
        name: p.name,
        type: p.type,
        description: p.description,
        price: p.price,
        category: p.category,
        discount: p.discount,
        color: p.color,
        size: p.size,
        amount: p.amount,
        image: p.image
    };
}

/* Delete */
/* Taso 1 */
async function deleteProduct(id) {
    try {
        const x = await Product.remove({ _id: mongoose.Types.ObjectId(id) });
        if (x && !x.deletedCount) {
            throw new Error("No products were deleted");
        }
        console.log("Removed: ", x);
    } catch (error) {
        console.error("Removal of object failed: ", error);
        throw error;
    }
}

module.exports = { getAllProducts, saveProduct, deleteProduct };