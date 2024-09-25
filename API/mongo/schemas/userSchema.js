const mongoose = require("mongoose");

/* 1. Schema */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String, require: true },
    email: { type: String, required: true },
});

userSchema.methods.speak = function speak() {
    const greeting = this.username
     ? "My name is " + this.username
     : "I don't have a name";
    console.log(greeting);
}

/* 2. module */
const User = mongoose.model("User", userSchema);
module.exports = { User };