export interface SubPostInterface {
    comment: string
    _id: number
    replies: number[]
}

export interface SubPostProps {
    subPost: SubPostInterface
}

export default function SubPost({ subPost } : SubPostProps) {
    return (
        <div className="subPost">
            <div className="post-top">
                <p>{subPost._id}</p>
                {subPost.replies.map(reply => {
                    return (
                        <p key={reply}>{reply}</p>
                    );
                })}
            </div>
            <p>{subPost.comment}</p>
        </div>
    );
}