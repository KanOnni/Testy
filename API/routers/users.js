const express = require("express");
const app = require("../App");
const { User } = require("../mongo/schemas/userSchema");
const router = express.Router(); //toimii ilman
const user = require("../mongo/userTest");
const bcrypt = require('bcrypt');

// GET home page
router.get("/", async function (req, res, next) {
    console.log(user);
    const list = await user.getAllUsers();
    res.json({ list });
});

/*
router.get("/", async function (req, res, next) {
    try {
        const userName = req.params.username;
        const passWord = req.params.password;
        console.log("~ file: index.js ~ line 35 ~ userName", userName);
        const list = await user.findUsers(userName, passWord);
        res.json({ list });
    } catch (error) {
        console.log("Error has ocured", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});
*/

/* POST home page or POST index root */
router.post("/add", async function (req, res, next) {
    /* Taso 0 */
    try {
        const u = req.body;
        console.log("🚀 ~ file: index.js ~ line 13 ~ req.body", req.body);
        
        const something = await user.saveUser({
            username: u.username,
            password: u.password,
            email: u.email,
        });

        console.log("User awaiting save", something);
        console.log("Outcome: " + JSON.stringify(u));
        res.json({ status: "ok", user: something })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "ERROR 500" })
    }
});

// POST /login - Log in a user
router.post('/find', async (req, res) => {
    console.log("POST FOUND");
    try {
        const { email, password } = req.body;
        
        // This checks for user in db
        const user = await User.findOne({ email: email });
        console.log(email)
        if (!user) {
            res.status(404).send('User not found.');
        } else {
            //This checks if pass word is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const something = {
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                };
                res.json({ status: "ok", user: something })
            } else {
                res.status(404).send('User not found.');
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred: ' + error.message);
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
        const { email } = req.body;

        //Updating user
        const updateUser = await User.findByIdAndUpdate(
            id, 
            { username },
            { password },
            { email },
            { new: true }
        );
        // Anwser to update
        res.json({ user: updateUser })
    } catch (error) {
        console.error("Error in updating users ", error);
        res.status(500).json({ error: "User update failed" })
    }
});
/*
app.post('/', async (req, res) => {
    try { 
      const { email, password } = req.body; // Get user input from request body
  
      // Find the user in the database
      const user = await User.findOne({ email: email });
  
      if (user) {
        // Compare the input data with database data
        if (user.password === password) {
          res.status(200).send('Input matches the database data.');
        } else {
          res.status(400).send('Password does not match.');
        }
      } else {
        res.status(404).send('User not found.');
      }
    } catch (error) {
      res.status(500).send('An error occurred: ' + error.message);
    }
});
*/
module.exports = router;