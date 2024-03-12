import mongoose from "mongoose";
import subPostSchema from "./subPost.js";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    subject: {
        type: String
    },
    comment: {
        type: String,
        required: true
    },
    subPosts: [subPostSchema]
});

const Post = mongoose.model("Post", postSchema);

export default Post;



