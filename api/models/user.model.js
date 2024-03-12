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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw237rq09U7Eu614_BJWvxqK&ust=1710161055295000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDMlcPc6YQDFQAAAAAdAAAAABAE"
    }
},{timestamps: true} // This makes the mongoDb to store the time of creation and updation of a user
);

const User = mongoose.model('User', userSchema);

export default User;