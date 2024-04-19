import Comment from "./Comment";
import Reply from "./Reply";

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
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SubPost({ subPost, comment, setComment, setShowForm } : SubPostProps) {

    return (
        <div className="post" id={subPost._id.toString()}>
            <div className="post-top">
                <p>#{subPost._id}</p>
                <p>{subPost.createdAt}</p>
                <Reply id={subPost._id} comment={comment} setComment={setComment} setShowForm={setShowForm}/>
                {subPost.replies.map(reply => {
                    return (
                        <a className="reply" href={`#${reply}`} key={reply}>{`>>${reply}`}</a>
                    );
                })}
            </div>
            <Comment comment={subPost.comment}/>
        </div>
    );
}