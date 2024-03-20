import SubPost from "./SubPost";
import { SubPostInterface } from "./SubPost";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface ThreadInterface {
    title: string
    subject: string
    _id: number
    subPosts: SubPostInterface[]
    replies: number[]
}

export default function Thread() {
    const [thread, setThread] = useState<ThreadInterface>();
    const { id } = useParams();

    useEffect(() => {
        async function fetchThread(id: string) {
            try {
                const response = await fetch(`http://localhost:4000/post/${id}`);
                const data = await response.json() as ThreadInterface;
                setThread(data);
            }
            catch (error) {
                console.error("failed to fetch thread", error);
            }
        }
        if ( id !== undefined) void fetchThread(id);
    }, [id]);

    if (!thread) return;

    return (
        <main>
            <Post title={thread.title} subject={thread.subject} _id={thread._id} replies={thread.replies}/>
            {thread.subPosts.map(subPost => {
                return (
                    <SubPost key={subPost._id} subPost={subPost} />
                );
            })}
        </main>
    );
}