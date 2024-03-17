const mongoose = require("mongoose");
const joi = require("joi");
/*const passwordComplexity = require("joi-password-complexity"); */
const jwt = require("jsonwebtoken");

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,      // لا يوجد فراغات بين الحروف
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,     // لا يتكرر نفس الايميل 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png", // صوره البروفايل من pixabay => user avatar
            publicId: null,
        }
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Populate Posts That Belongs To This User When he/she Get his/her Profile   #16 16/11/2023
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
});


// Generate Auth Token
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);

}



// User Model
const User = mongoose.model("User", UserSchema);


// Validate Register User
function validateRegisterUser(obj) {
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100).required(),
        email: joi.string().trim().min(5).max(100).required().email(),
        password:joi.string().trim().min(2).required(),
    });
    return schema.validate(obj);
}


// Validate login User
function  validateLoginUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(2).required(),
    });
    return schema.validate(obj);
}

// Validate Update User
function validateUpdateUsern(obj) {
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100),
        password: joi.string().trim().min(2),
        bio: joi.string(),
    });
    return schema.validate(obj);
}

// Validate Email
function validateEmail(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}

// Validate New Password
function validateNewPassword(obj) {
    const schema = joi.object({
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}








module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUsern,
    validateEmail,
    validateNewPassword
}
