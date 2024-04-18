interface ReplyProps {
    id: number
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
}

export default function Reply({ id, comment, setComment } : ReplyProps) {
    return (
        <a className="reply-button" href="#" onClick={() => setComment(`>>${id}\n` + comment)}>Reply</a>
    );
}