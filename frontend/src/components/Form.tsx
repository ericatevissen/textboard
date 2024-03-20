interface FormProps {
    showForm: boolean
    threadId: number
}

export default function Form({ showForm, threadId } : FormProps) {
    if (showForm === false) return;

    if (location.pathname === "/") {
        return (
            <form action="http://localhost:4000/post" method="post">
                <input type="text" name="subject" placeholder="subject" />
                <input type="text" name="comment" placeholder="comment" />
                <button type="submit">post</button>
            </form>
        );
    }

    return (
        <form action="http://localhost:4000/post" method="post">
            <input type="hidden" name="parent" value={threadId}/>
            <input type="text" name="comment" placeholder="comment" />
            <button type="submit">post</button>
        </form>
    );
}