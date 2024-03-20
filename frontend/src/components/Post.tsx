export interface PostProps {
    subject: string
    comment: string
    _id: number
    replies: number[]
}

export default function Post ({ subject, comment, _id, replies } : PostProps){
    return (
        <div className="post">
            <div className="post-top">
                <p className="number">0</p>
                {replies.map(reply => {
                    return (
                        <p key={reply}>{reply}</p>
                    );
                })}
            </div>  
            <h2>{subject}</h2>
            <p>{comment}</p>
        </div>
    );
}