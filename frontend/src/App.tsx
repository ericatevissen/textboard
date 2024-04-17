import { useEffect, useState } from "react";
import PreviewGrid from "./components/PreviewGrid";
import { PreviewInterface } from "./components/Preview";
import { Route, Routes, useNavigate } from "react-router-dom";
import Thread from "./components/Thread";
import pencilSvg from "/pencil.svg";
import Form from "./components/Form";

export default function App() {
    const navigate = useNavigate();
    const [previewList, setPreviewList] = useState<PreviewInterface[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [threadId, setThreadId] = useState<number>(Number);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchPreviews() {
            try {
                const response = await fetch("http://localhost:4000/previews");
                const data = await response.json() as PreviewInterface[];
                setPreviewList(data);
            }
            catch (error) {
                console.error("failed to fetch previews", error);
            }
        }

        void fetchPreviews();
    }, []);

    function handleThreadId(id: number) {
        setThreadId(id);
    }

    function closeForm() {
        setShowForm(false);
    }

    async function handleSubmit() {
        const form = document.querySelector("form");
        let formObj;
        let payload;

        if (form) {
            const formData = new FormData(form);
            formObj = Object.fromEntries(formData);
            payload = JSON.stringify(formObj);
        }

        try {
            const response = await fetch("http://localhost:4000/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: payload
            });

            if (formObj && formObj.parent) {
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
                <Route path="/" element={<PreviewGrid previewList={previewList} />} />
                <Route path="/:id" element={<Thread handleThreadId={handleThreadId}
                    refresh={refresh} setRefresh={setRefresh}/>} />
            </Routes>
            <Form showForm={showForm} threadId={threadId} closeForm={closeForm} handleSubmit={handleSubmit}/>
            <button className="form-button" onClick={() => setShowForm(true)}>
                <img src={pencilSvg} alt="pencil icon"/>
            </button>
        </>
    );
}