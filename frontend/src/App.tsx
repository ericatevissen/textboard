import { useEffect, useState } from "react";
import PreviewGrid from "./components/PreviewGrid";
import { PreviewInterface } from "./components/Preview";
import { Route, Routes } from "react-router-dom";
import Thread from "./components/Thread";

export default function App() {
    const [previewList, setPreviewList] = useState<PreviewInterface[]>([]);

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

        fetchPreviews();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<PreviewGrid previewList={previewList} />} />
                <Route path="/:id" element={<Thread/>} />
            </Routes>
        </>
    );
}