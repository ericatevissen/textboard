interface FormProps {
    showForm: boolean
    threadId: number
    closeForm: () => void
}

export default function Form({ showForm, threadId, closeForm }: FormProps) {
    if (!showForm) return null;

    return (
        <form>
            {location.pathname === "/" ? (
                <>
                    <input className="subject" type="text" name="subject" placeholder="subject" />
                    <textarea className="comment" name="comment" placeholder="comment" />
                </>
            ) : (
                <>
                    <input type="hidden" name="parent" value={threadId} />
                    <textarea className="comment" name="comment" placeholder="comment" />
                </>
            )}
            <div>
                <button type="button" onClick={closeForm}>close</button>
                <button type="submit">post</button>
            </div>
        </form>
    );
}
