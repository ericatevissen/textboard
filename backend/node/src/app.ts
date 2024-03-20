import express from "express";
import mongoose from "mongoose";
import Post from "./schemas/post.js";
import SubPostSchema from "./schemas/subPost.js";

const app = express();
const SubPost = mongoose.model("SubPost", SubPostSchema);

mongoose.connect("mongodb://mongo_c:27017/board")
    .then(() => console.log("connected to db"))
    .catch((error) => console.error("connection error", error));

app.use(express.urlencoded({ extended: true }));

app.get("/previews", (req, res) => {
    Post.find()
        .then((result) => res.send(result))
        .catch((error) => console.error("failed to fetch posts", error));
});

app.post("/post", (req, res) => {
    if (req.body.parent) {
        const subPost = new SubPost(req.body);

        if (req.body.replyOf === req.body.parent) {
            Post.findOneAndUpdate(
                { _id: req.body.parent },
                { $push: { subPosts: subPost, replies: subPost.id } },
                { new: true }
            )
                .then(() => res.redirect(`/post/${req.body.parent}`))
                .catch((error) => console.error("failed to send subpost", error));
        } 
        else if (req.body.replyOf) {
            Post.findOneAndUpdate(
                { _id: req.body.parent },
                { $push: { subPosts: subPost } },
                { new: true }
            )
                .then(() => {
                    Post.updateOne(
                        { _id: req.body.parent, "subPosts._id": req.body.replyOf },
                        { $push: { "subPosts.$.replies" : subPost.id } },
                        { new: true }
                    )
                        .then(() => res.redirect(`/post/${req.body.parent}`))
                        .catch((error) => console.error(error));
                })
                .catch((error) => console.error("failed to send subpost", error));
        } 
        else {
            Post.findOneAndUpdate(
                { _id: req.body.parent },
                { $push: { subPosts: subPost } },
                { new: true }
            )
                .then(() => res.redirect(`/post/${req.body.parent}`))
                .catch((error) => console.error("failed to send subpost", error));
        }
    } else {
        const post = new Post(req.body);

        post.save()
            .then(() => res.redirect(`/post/${post.id}`))
            .catch((error) => console.error("failed to send post", error));
    }
});

app.get("/post/:id", (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => console.error("failed to fetch post", error));
});

app.listen(4000);