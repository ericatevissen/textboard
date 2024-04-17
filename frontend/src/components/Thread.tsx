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
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Thread( { handleThreadId, refresh, setRefresh } : ThreadProps) {
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
        if (id) void fetchThread(id);
        if (refresh && id) {
            void fetchThread(id);
            setRefresh(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refresh]);

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