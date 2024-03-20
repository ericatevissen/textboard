interface FormProps {
    showForm: boolean
    threadId: number
}

export default function Form({ showForm, threadId } : FormProps) {
    if (showForm === false) return;

    if (location.pathname === "/") {
        return (
            <form action="http://localhost:4000/post" method="post">
                <input className={"subject"} type="text" name="subject" placeholder="subject" />
                <textarea className={"comment"} name="comment" placeholder="comment" />
                <button type="submit">post</button>
            </form>
        );
    }

    return (
        <form action="http://localhost:4000/post" method="post">
            <input type="hidden" name="parent" value={threadId}/>
            <textarea className={"comment"} name="comment" placeholder="comment" />
            <button type="submit">post</button>
        </form>
    );
}