export interface SubPostInterface {
    comment: string
    _id: number
    replies: number[]
    createdAt: string
}

export interface SubPostProps {
    subPost: SubPostInterface
}

export default function SubPost({ subPost } : SubPostProps) {
    return (
        <div className="post">
            <div className="post-top">
                <p>#{subPost._id}</p>
                <p>{subPost.createdAt}</p>
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