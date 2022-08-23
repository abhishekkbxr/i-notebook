const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please entre your name '],
        maxlength: [30, "Name cannot exceed more then 30 characters "],
        minlength: [4, "Name cannot less then 4 characters "]
    },
    email: {
        type: String,
        required: [true, 'please entre your Email '],
        unique: true,
        validate: [validator.isEmail, "Entre a valid Email "]
    },
    password: {
        type: String,
        required: [true, 'please entre your password '],
        minlength: [4, "minimmum length should be 4 "],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
});

// jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword , this.password)

}

// generating reset password token
userSchema.methods.getResetPasswordToken = function () {

    // genetating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetpasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken
};






module.exports = new mongoose.model("User", userSchema)
