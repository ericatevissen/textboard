export interface PostProps {
    title: string
    subject: string
    _id: number
    replies: number[]
}

export default function Post ({ title, subject, _id, replies } : PostProps){
    return (
        <div className="post">
            <div className="post-top">
                <p>{_id}</p>
                {replies.map(reply => {
                    return (
                        <p key={reply}>{reply}</p>
                    );
                })}
            </div>
            <p>{title}</p>
            <p>{subject}</p>
        </div>
    );
}