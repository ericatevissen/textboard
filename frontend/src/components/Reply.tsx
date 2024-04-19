interface ReplyProps {
    id: number
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Reply({ id, comment, setComment, setShowForm } : ReplyProps) {
    return (
        <p className="reply-button" onClick={() => {
            setComment(`>>${id}\n` + comment);
            setShowForm(true);
        }}>Reply</p>
    );
}