import ReplyLink from "./ReplyLink";
import { RefObject } from "react";

export interface CommentProps {
    comment: string
    ref: RefObject<HTMLDivElement>;
}

export default function Comment({ comment, ref }: CommentProps) {
    const lines = comment.split("\n");

    return (
        <div>
            {
                lines.map((line, index) => {
                    if (line.trim().startsWith(">>")) {
                        return <ReplyLink key={index} line={line} ref={ref}/>;
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