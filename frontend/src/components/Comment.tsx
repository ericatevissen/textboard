export interface CommentProps {
    comment: string
}

export default function Comment({ comment }: CommentProps) {
    const lines = comment.split("\n");

    return (
        <div>
            {
                lines.map((line, index) => {
                    const replyOf = parseInt(line.trim().substring(2));
                    if (line.trim().startsWith(">>")) {
                        return <a href={`#${replyOf}`} className="replyOf" key={index}>{line}</a>;
                    }
                    if (line.trim().startsWith(">")) {
                        return <p key={index} className="greentext">{line}</p>;
                    }
                    else {
                        return <p key={index}>{line}</p>;
                    }
                })
            }
        </div>
    );
}