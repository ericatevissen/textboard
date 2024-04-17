import mongoose from "mongoose";
import SubPostSchema from "./subPost.js";
import Counter from "./counter.js";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        _id: Number,
        subject: {
            type: String,
        },
        comment: {
            type: String,
            required: true
        },
        subPosts: [SubPostSchema],
        replies: [Number]
    },
    { timestamps: true }
);

// assigns an id using the Post counter, and creates that counter if it doesn't exist yet
PostSchema.pre("save", async function(next) {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "Post" }, // This is the ID for your counter document (should be unique for the collection)
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        ).exec();

        this._id = counter.seq; // Set the sequential ID to the _id field of your document
        next();
    } 
    catch (error) {
        console.error(error);
        next();
    }
});

// assigns an id using the post's subPost counter, and creates that counter if it doesn't exist yet
PostSchema.post("findOneAndUpdate", async function(doc) {
    try {
        const newSubPost = doc.subPosts[doc.subPosts.length - 1];

        if (!newSubPost._id) {
            const counter = await Counter.findOneAndUpdate(
                { _id: doc._id + "-subPostCounter" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            ).exec();
            newSubPost._id = counter.seq;
            await Post.updateOne(
                { _id: doc._id, "subPosts.createdAt": newSubPost.createdAt },
                { $set: { "subPosts.$._id": newSubPost._id } },
            )
                .then(() => {
                    if (newSubPost.replyOf) {
                        newSubPost.replyOf.map((replied: number) => {
                            if (replied === 0) {
                                Post.findOneAndUpdate(
                                    { _id: doc._id },
                                    { $push: { replies: newSubPost._id } },
                                    { new: true }
                                )
                                    .catch((error) => console.error(error));
                            }
                            else {
                                Post.updateOne(
                                    { _id: doc._id, "subPosts._id": replied },
                                    { $push: { "subPosts.$.replies": newSubPost._id } },
                                    { new: true }
                                )
                                    .catch((error) => console.error(error));
                            }
                        });
                    }
                });
        }
    }

    catch (error) {
        console.error(error);
    }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;