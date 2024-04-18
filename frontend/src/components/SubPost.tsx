import Comment from "./Comment";
import Reply from "./Reply";
import { RefObject } from "react";

export interface SubPostInterface {
    comment: string
    _id: number
    replies: number[]
    createdAt: string
}

export interface SubPostProps {
    subPost: SubPostInterface
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
    ref: RefObject<HTMLDivElement>;
}

export default function SubPost({ subPost, comment, setComment, ref} : SubPostProps) {

    return (
        <div className="post">
            <div className="post-top">
                <p>#{subPost._id}</p>
                <p>{subPost.createdAt}</p>
                <Reply id={subPost._id} comment={comment} setComment={setComment}/>
                {subPost.replies.map(reply => {
                    return (
                        <p key={reply}>{">>"}{reply}</p>
                    );
                })}
            </div>
            <Comment comment={subPost.comment} ref={ref}/>
        </div>
    );
}