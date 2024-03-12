import express from "express";
import mongoose from "mongoose";
import Post from "./schemas/post.js";
import subPostSchema from "./schemas/subPost.js";

const app = express();
const SubPost = mongoose.model("SubPost", subPostSchema);

mongoose.connect("mongodb://mongo_c:27017/board")
    .then(() => console.log("connected to db"))
    .catch((error: Error) => console.error("connection error", error));

app.use(express.urlencoded({ extended: true }));

app.get("/posts", (req, res) => {
    Post.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => console.error("failed to fetch posts", error));
});

app.post("/post", (req, res) => {
    if (req.body.parent) {
        const subPost = new SubPost(req.body);

        Post.findByIdAndUpdate(req.body.parent, { $push: { subPosts: subPost } }, { new: true })
            .then((result) => res.send(result))
            .catch((error: Error) => {
                console.error("failed to send subpost", error);
            });
    }
    else {
        const post = new Post(req.body);
        post.save()
            .then((result) => {
                res.redirect(`/post/${result._id}`);
            })
            .catch((error: Error) => console.error("failed to send post", error));
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