interface FormProps {
    showForm: boolean
    threadId: number
    closeShowForm: () => void
}

export default function Form({ showForm, threadId, closeShowForm } : FormProps) {
    if (showForm === false) return;

    if (location.pathname === "/") {
        return (
            <form action="http://localhost:4000/post" method="post">
                <input className={"subject"} type="text" name="subject" placeholder="subject" />
                <textarea className={"comment"} name="comment" placeholder="comment" />
                <div>
                    <button onClick={closeShowForm}>close</button>
                    <button type="submit">post</button>
                </div>
            </form>
        );
    }

    return (
        <form action="http://localhost:4000/post" method="post">
            <input type="hidden" name="parent" value={threadId}/>
            <textarea className={"comment"} name="comment" placeholder="comment" />
            <button onClick={closeShowForm}>close</button>
            <button type="submit">post</button>
        </form>
    );
}