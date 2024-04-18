import Comment from "./Comment";
import Reply from "./Reply";
import { RefObject } from "react";

interface PostProps {
    subject: string
    comment: string
    id: number
    replies: number[]
    createdAt: string
    formComment: string
    setFormComment: React.Dispatch<React.SetStateAction<string>>
    ref: RefObject<HTMLDivElement>;
}

export default function Post({ subject, comment, id, replies, createdAt, formComment, setFormComment, ref } : PostProps){
    return (
        <div className="post">
            <div className="post-top">
                <p>#0</p>
                <p>{createdAt}</p>
                <p>No.{id}</p>
                <Reply id={id} comment={formComment} setComment={setFormComment}/>
                {replies.map(reply => {
                    return (
                        <p key={reply}>{">>"}{reply}</p>
                    );
                })}
            </div>
            
            <h2>{subject}</h2>
            <Comment comment={comment} ref={ref}/>
        </div>
    );
}