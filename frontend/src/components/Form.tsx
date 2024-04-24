interface FormProps {
    showForm: boolean
    threadId: number
    closeForm: () => void
    handleSubmit: () => Promise<void>
    subject: string
    setSubject: React.Dispatch<React.SetStateAction<string>>
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
}

export default function Form({ showForm, threadId, closeForm, 
    handleSubmit, subject, setSubject, comment, setComment }: FormProps) {

    if (!showForm) return null;
    
    return (
        <form className="post-form" action="" method="post" onSubmit={e => {
            e.preventDefault();
            void handleSubmit();
            setSubject("");
            setComment("");
            closeForm();
        }}
        >
            {location.pathname === "/" ? (
                <>
                    <input className="form-subject" type="text" name="subject" 
                        placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                    <textarea className="form-comment" name="comment" placeholder="comment" required
                        value={comment} onChange={(e) => setComment(e.target.value)}/>
                </>
            ) : (
                <>
                    <input type="hidden" name="parent" value={threadId} />
                    <textarea className="form-comment" name="comment" placeholder="comment" 
                        value={comment} onChange={(e) => setComment(e.target.value)}/>
                </>
            )}
            <div>
                <button type="button" onClick={closeForm}>close</button>
                <button type="submit">post</button>
            </div>
        </form>
    );
}
