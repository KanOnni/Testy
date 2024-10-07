const mongoose = require("mongoose");
const { User } = require("./schemas/userSchema");

// List all
async function getAllUsers() {
    const allUsers = await User.find();
    return allUsers.map((u) => {
        return {
            id: u._id.toHexString(),
            username: u.username,
            password: u.password,
            email: u.email
        };
    });
}


async function findUsers(email, pass) {
    const user = await User.find({ $and: [ { eamil: { $eq: email } }, { password: { $eq: pass } } ] });
    return user.map((u) => {
        return {
            id: u._id.toHexString(),
            username: u.username,
            password: u.password,
            email: u.email
        };
    });
}

/* Save */
async function saveUser(u) {
    console.log("Here have users: ", JSON.stringify(u));
    const saveUser = await User.create({
        username: u.username,
        password: u.password,
        email: u.email
    });
    console.log(saveUser);
    const userId = saveUser._id.toHexString();
    return {
        id: userId,
        username: u.username,
        password: u.password,
        email: u.email
    };
}

/* Delete */
/* Taso 1 */
async function deleteUser(id) {
    try {
        const x = await User.remove({ _id: mongoose.Types.ObjectId(id) });
        if (x && !x.deletedCount) {
            throw new Error("No users were deleted");
        }
        console.log("Removed: ", x);
    } catch (error) {
        console.error("Removal of object failed: ", error);
        throw error;
    }
}

module.exports = { getAllUsers, findUsers, saveUser, deleteUser };