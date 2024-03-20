interface FormProps {
    showForm: boolean
}

export default function Form({ showForm } : FormProps) {
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
            <input type="text" name="comment" placeholder="comment" />
            <button type="submit">post</button>
        </form>
    );
}