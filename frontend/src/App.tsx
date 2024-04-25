import { useState } from "react";
import PreviewGrid from "./components/PreviewGrid";
import { Route, Routes, useNavigate } from "react-router-dom";
import Thread from "./components/Thread";
import Form from "./components/Form";
import Login from "./components/Login";
import FormButton from "./components/FormButton";

export const serverUrl = import.meta.env.VITE_SERVERURL as string || "http://localhost:4000";

export default function App() {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [threadId, setThreadId] = useState<number>(Number);
    const [refresh, setRefresh] = useState(false);
    const [subject, setSubject] = useState("");
    const [comment, setComment] = useState("");
    const [previewOrder] = useState("new");

    function handleThreadId(id: number) {
        setThreadId(id);
    }

    function closeForm() {
        setShowForm(false);
    }

    interface FormObj {
        [key: string]: string | number | File | number[];
        replyOf: number[]
    }

    async function handleSubmit() {
        const form = document.querySelector("form");
        let formObj: FormObj = { replyOf: [] };
        let payload;

        if (form) {
            const formData = new FormData(form);
            formObj = { ...formObj, ...Object.fromEntries(formData) };
            formObj.replyOf = [];

            if (formObj && formObj.comment) {
                // eslint-disable-next-line @typescript-eslint/no-base-to-string
                const lines = formObj.comment.toString().split("\n");
                lines.map((line) => {
                    if (line.trim().startsWith(">>")) {
                        formObj.replyOf.push(parseInt(line.trim().substring(2)));
                    }
                });
            }

            payload = JSON.stringify(formObj);
        }

        try {
            const response = await fetch(`${serverUrl}/api/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: payload
            });

            if (response.status === 403) alert("You're banned");
            if (formObj.parent) {
                setRefresh(true);
            }
            else {
                const id = await response.json() as string;
                navigate(`/${id}`);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>Textboard</h1>
            <Routes>
                <Route path="/" element={<><PreviewGrid previewOrder={previewOrder} />
                    <FormButton setShowForm={setShowForm} /></>} />
                <Route path="/:id" element={<>
                    <Thread handleThreadId={handleThreadId} setShowForm={setShowForm}
                        refresh={refresh} setRefresh={setRefresh} formComment={comment} setFormComment={setComment}/>
                    <FormButton setShowForm={setShowForm} />
                </>} />
                <Route path="/login" element={<Login />}/>
            </Routes>
            <Form showForm={showForm} threadId={threadId} closeForm={closeForm} handleSubmit={handleSubmit}
                subject={subject} setSubject={setSubject} comment={comment} setComment={setComment}/>
        </>
    );
}