import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subPostSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    replies: [String]
});

export default subPostSchema;