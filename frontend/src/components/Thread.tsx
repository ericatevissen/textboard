import SubPost from "./SubPost";
import { SubPostInterface } from "./SubPost";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface ThreadInterface {
    subject: string
    comment: string
    _id: number
    subPosts: SubPostInterface[]
    replies: number[]
}

interface ThreadProps {
    handleThreadId: (id: number) => void
}

export default function Thread( { handleThreadId } : ThreadProps) {
    const [thread, setThread] = useState<ThreadInterface>();
    const { id } = useParams();

    useEffect(() => {
        async function fetchThread(id: string) {
            try {
                const response = await fetch(`http://localhost:4000/post/${id}`);
                const data = await response.json() as ThreadInterface;
                setThread(data);
                if (data !== undefined) handleThreadId(data._id);
            }
            catch (error) {
                console.error("failed to fetch thread", error);
            }
        }
        if ( id !== undefined) void fetchThread(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!thread) return;

    return (
        <main>
            <Post subject={thread.subject} comment={thread.comment} _id={thread._id} replies={thread.replies}/>
            {thread.subPosts.map(subPost => {
                return (
                    <SubPost key={subPost._id} subPost={subPost} />
                );
            })}
        </main>
    );
}