import SubPost from "./SubPost";
import { SubPostInterface } from "./SubPost";
import Post from "./Post";
import { createRef, useEffect, useRef, useState, RefObject } from "react";
import { useParams } from "react-router-dom";

export interface ThreadInterface {
    subject: string
    comment: string
    _id: number
    subPosts: SubPostInterface[]
    replies: number[]
    createdAt: string
}

interface ThreadProps {
    handleThreadId: (id: number) => void
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    formComment: string
    setFormComment: React.Dispatch<React.SetStateAction<string>>
}

export default function Thread( { handleThreadId, refresh, setRefresh, formComment, setFormComment } : ThreadProps) {
    const [thread, setThread] = useState<ThreadInterface>();
    const { id } = useParams();
    const refs = useRef<RefObject<HTMLDivElement>[] | never[]>([]);
    refs.current[0] ?? createRef();

    useEffect(() => {
        async function fetchThread(id: string) {
            try {
                const response = await fetch(`http://localhost:4000/post/${id}`);
                const data = await response.json() as ThreadInterface;
                setThread(data);
                if (data !== undefined) handleThreadId(data._id);
                refs.current[0] ?? createRef();
                if(thread) refs.current = thread.subPosts.map((_element, index) => refs.current[index] ?? createRef());
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
        <main className="thread">
            <Post subject={thread.subject} comment={thread.comment} id={thread._id} 
                replies={thread.replies} createdAt={thread.createdAt} 
                formComment={formComment} setFormComment={setFormComment} ref={refs.current[0]}/>
            {thread.subPosts.map(subPost => {
                return (
                    <SubPost key={subPost._id} subPost={subPost} 
                        comment={formComment} setComment={setFormComment} ref={refs.current[subPost._id]}/>
                );
            })}
        </main>
    );
}