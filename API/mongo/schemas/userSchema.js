const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

/* 1. Schema */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String, require: true },
    email: { type: String, required: true },
}, {
    versionKey: false
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

/* 2. module */
const User = mongoose.model("User", userSchema);
module.exports = { User };