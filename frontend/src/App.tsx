import { useEffect, useState } from "react";
import PreviewGrid from "./components/PreviewGrid";
import { PreviewInterface } from "./components/Preview";
import { Route, Routes } from "react-router-dom";
import Thread from "./components/Thread";
import pencilSvg from "/pencil.svg";
import Form from "./components/Form";

export default function App() {
    const [previewList, setPreviewList] = useState<PreviewInterface[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [threadId, setThreadId] = useState<number>(Number);

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

    return (
        <>
            <h1>Textboard</h1>
            <Routes>
                <Route path="/" element={<PreviewGrid previewList={previewList} />} />
                <Route path="/:id" element={<Thread handleThreadId={handleThreadId}/>} />
            </Routes>
            <Form showForm={showForm} threadId={threadId} closeForm={closeForm}/>
            <button className="form-button" onClick={() => setShowForm(true)}>
                <img src={pencilSvg} alt="pencil icon"/>
            </button>
        </>
    );
}