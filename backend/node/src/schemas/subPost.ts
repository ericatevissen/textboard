import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubPostSchema = new Schema(
    {
        _id: Number,
        comment: {
            type: String,
            required: true
        },
        replies: [String]
    },
    { timestamps: true }
);

export default SubPostSchema;