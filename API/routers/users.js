const express = require("express");
const app = require("../App");
const { User } = require("../mongo/schemas/userSchema");
const router = express.Router(); //toimii ilman
const user = require("../mongo/userTest");

/* GET home page */
router.get("/", async function (req, res, next) {
    console.log(user);
    const list = await user.getAllUsers();
    console.log(list);
    res.json({ list });
});

/* POST home page or POST index root */
router.post("/", async function (req, res, next) {
    /* Taso 0 */
    try {
        const body = req.body;
        console.log("🚀 ~ file: index.js ~ line 13 ~ req.body", req.body);
        
        const something = await user.saveUser({
            username: u.username,
            password: u.password,
            address: u.address
        });

        console.log("User awaiting save", something);
        console.log("Outcome: " + JSON.stringify(body));
        res.json({ status: "ok", user: something })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});

/* routter delete */
router.delete("/:id", async function (req, res, next) {
    try {
        const userId = req.params.id;
        console.log("~ file: index.js ~ line 35 ~ userId", userId);
        const test = await user.deleteUser(userId);
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
        const { username } = req.body;
        const { password } = req.body;
        const { address } = req.body;

        //Updating user
        const updateUser = await User.findByIdAndUpdate(
            id, 
            { username },
            { password },
            { address },
            { new: true }
        );
        // Anwser to update
        res.json({ user: updateUser })
    } catch (error) {
        console.error("Error in updating users ", error);
        res.status(500).json({ error: "User update failed" })
    }
});

module.exports = router;