import SubPost from "./SubPost";
import { SubPostInterface } from "./SubPost";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";

export interface ThreadInterface {
    subject: string
    comment: string
    _id: number
    subPosts: SubPostInterface[]
    replies: number[]
    createdAt: string
    ip: string | null
}

interface ThreadProps {
    handleThreadId: (id: number) => void
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    formComment: string
    setFormComment: React.Dispatch<React.SetStateAction<string>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Thread({ handleThreadId, refresh, setRefresh, formComment, setFormComment, setShowForm } : ThreadProps) {
    const [thread, setThread] = useState<ThreadInterface>();
    const { id } = useParams();
    const [admin, setAdmin] = useState(false);

    interface Data {
        admin: boolean
        thread: ThreadInterface
    }

    useEffect(() => {
        async function fetchThread(id: string) {
            try {
                const response = await fetch(`${serverUrl}/api/post/${id}`, {credentials:"include"});
                const data = await response.json() as Data;
                data.thread.createdAt = data.thread.createdAt.slice(0,-5);
                setAdmin(data.admin);

                data.thread.subPosts.map((subPost, index) => {
                    data.thread.subPosts[index].createdAt = subPost.createdAt.slice(0,-5);
                });

                setThread(data.thread);
                if (data !== undefined) handleThreadId(data.thread._id);
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
            <Post subject={thread.subject} comment={thread.comment} id={thread._id} admin={admin}
                replies={thread.replies} createdAt={thread.createdAt} setShowForm={setShowForm}
                formComment={formComment} setFormComment={setFormComment} setRefresh={setRefresh} ip={thread.ip}/>
            {thread.subPosts.map(subPost => {
                return (
                    <SubPost key={subPost._id} subPost={subPost} setShowForm={setShowForm}
                        setRefresh={setRefresh} comment={formComment} setComment={setFormComment}
                        parentId={thread._id} admin={admin} />
                );
            })}
        </main>
    );
}