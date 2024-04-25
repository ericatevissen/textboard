import Ban from "./Ban";
import Comment from "./Comment";
import Remove from "./Remove";
import Reply from "./Reply";

interface PostProps {
    subject: string
    comment: string
    id: number
    replies: number[]
    createdAt: string
    formComment: string
    setFormComment: React.Dispatch<React.SetStateAction<string>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    admin: boolean
    ip: string | null
}

export default function Post({ subject, comment, id, replies, createdAt, 
    formComment, setFormComment, setShowForm, setRefresh, admin, ip } : PostProps){
    return (
        <div className="post" id={"0"}>
            <div className="post-top">
                <p>#0</p>
                <p>{createdAt}</p>
                <p>No.{id}</p>
                <Reply id={0} comment={formComment} setComment={setFormComment} setShowForm={setShowForm}/>
            </div>
            <h2>{subject}</h2>
            <Comment comment={comment}/>
            <div className="replies">
                {replies.map(reply => {
                    return (
                        <a className="reply" href={`#${reply}`} key={reply}>{`>>${reply}`}</a>
                    );
                })}
            </div>
            {admin ? 
                <div className="admin-buttons">
                    <Ban ip={ip}/>
                    <Remove postId={id} parentId={null} setRefresh={setRefresh}/> 
                </div>
                : null}
        </div>
    );
}