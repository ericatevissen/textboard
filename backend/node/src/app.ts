import express from "express";
import mongoose from "mongoose";
import Post from "./schemas/post.js";
import SubPostSchema from "./schemas/subPost.js";

const app = express();
const SubPost = mongoose.model("SubPost", SubPostSchema);

mongoose.connect("mongodb://mongo_c:27017/board")
    .then(() => console.log("connected to db"))
    .catch((error) => console.error("connection error", error));

app.use(express.json());

app.get("/previews", (req, res) => {
    Post.find()
        .then((result) => {
            const filteredPosts: { _id: number | null; subject: string | null | undefined; comment: string; replyCount: number; }[] = [];

            result.map((post) => {
                const filteredPost = {
                    _id: post._id,
                    subject: post.subject,
                    comment: post.comment,
                    replyCount: post.subPosts.length
                };

                filteredPosts.push(filteredPost);
            });

            res.send(filteredPosts);
        })
        .catch((error) => console.error("failed to fetch posts", error));
});

app.post("/post", (req, res) => {
    if (req.body.parent) {
        const subPost = new SubPost(req.body);

        Post.findOneAndUpdate(
            { _id: req.body.parent },
            { $push: { subPosts: subPost} },
            { new: true }
        )
            .then(() => res.send(200))
            .catch((error) => console.error("failed to send subpost", error));
    }
    else {
        const post = new Post(req.body);

        post.save()    
            .then((result) => res.send(result.id))
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