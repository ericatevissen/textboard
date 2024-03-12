import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subPostSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    replies: [String],
    id: Number
});

export default subPostSchema;