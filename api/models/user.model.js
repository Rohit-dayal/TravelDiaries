import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
    },
    isAdmin: { // someone can change from frontend true or false but can't change cookie so we are safe
        type: Boolean,
        default: false
    }
},{timestamps: true} // This makes the mongoDb to store the time of creation and updation of a user
);

const User = mongoose.model('User', userSchema);

export default User;