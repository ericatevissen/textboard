import { RefObject } from "react";

interface ReplyLinkProps {
    line: string
    ref: RefObject<HTMLDivElement>;
}

export default function ReplyLink({ line, ref } : ReplyLinkProps) {
    return (
        <a className="replyOf" href="#"
            onClick={() => ref.current?.scrollIntoView()}>{line}</a>
    );
}