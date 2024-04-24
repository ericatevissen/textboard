import dotenv from "dotenv";
import session from "express-session";
import { default as connectMongoDBSession} from "connect-mongodb-session";
const MongoDBStore = connectMongoDBSession(session);
import express from "express";
import mongoose from "mongoose";
import Post from "./schemas/post.js";
import SubPostSchema from "./schemas/subPost.js";

declare module "express-session" {
    interface SessionData {
        user: string;
    }
}

dotenv.config();

const app = express();
const SubPost = mongoose.model("SubPost", SubPostSchema);

const admin = {
    user: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD
};

mongoose.connect("mongodb://mongo_c:27017/board")
    .then(() => console.log("connected to db"))
    .catch((error) => console.error("connection error", error));

const store = new MongoDBStore({
    uri: "mongodb://mongo_c:27017/board",
    collection: "cookies"
});

app.use(express.json());

app.use(
    session({
        secret: process.env.SECRET as string,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: { secure: process.env.MODE === "dev" ? false : true }
    })
);

app.get("/api/previews", (req, res) => {
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

app.post("/api/post", (req, res) => {
    if (req.body.parent) {
        const subPost = new SubPost(req.body);

        Post.findOneAndUpdate(
            { _id: req.body.parent },
            { $push: { subPosts: subPost} },
            { new: true }
        )
            .then(() => res.status(200).send())
            .catch((error) => console.error("failed to send subpost", error));
    }
    else {
        const post = new Post(req.body);

        post.save()    
            .then((result) => res.send(result.id))
            .catch((error) => console.error("failed to send post", error));
    }
});

app.use((req, res, next) => {
    if (req.session.user === admin.user)  {
        res.locals.admin = true;
    }
    else res.locals.admin = false;

    next();
});

app.get("/api/post/:id", (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then((result) => {
            const response = {
                admin: res.locals.admin,
                thread: result
            };
            res.send(response);
        })
        .catch((error) => console.error("failed to fetch post", error));
});

app.post("/api/login", (req, res) => {
    if (req.body.user !== admin.user || req.body.password !== admin.password) {
        res.status(401).send();
    }
    else {
        req.session.user = req.body.user;
        res.status(200).send();
    }
});

app.use((req, res, next) => {
    if (req.session.user === admin.user) next();
    else res.status(401).send();
});

app.post("/api/remove", (req, res) => {
    if (!req.body.parentId) {
        Post.findByIdAndDelete(req.body.postId)
            .then(() => res.status(200).send())
            .catch((error) => console.error("failed to delete post", error));
    }
    else {
        Post.findOneAndUpdate(
            { _id: req.body.parentId },
            { $pull: { subPosts: { _id: req.body.postId} } },
            { new: true }
        )
            .then(() => res.status(200).send())
            .catch((error) => console.error(error));
    }
});

app.listen(4000);