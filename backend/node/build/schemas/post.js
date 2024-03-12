import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = new Schema({
    subject: {
        type: String
    },
    comment: {
        type: String,
        required: true
    },
    parents: [{
            type: String,
            index: 1
        }],
    children: [{
            type: String,
            index: -1
        }]
});
const Post = mongoose.model("Post", postSchema);
export default Post;
