import { useEffect, useState } from "react";
import { PreviewInterface } from "./Preview";
import { serverUrl } from "../App";
import Preview from "./Preview";

export interface GridProps {
    previewOrder: string
}

export default function PreviewGrid({ previewOrder } : GridProps) {
    const [previewList, setPreviewList] = useState<PreviewInterface[]>([]);

    useEffect(() => {
        async function fetchPreviews() {
            try {
                const response = await fetch(`${serverUrl}/api/previews`);
                const data = await response.json() as PreviewInterface[];
                setPreviewList(data);
            }
            catch (error) {
                console.error("failed to fetch previews", error);
            }
        }

        void fetchPreviews();
    }, []);

    let previews;
    if(previewOrder === "new") previews = [...previewList].reverse();

    return (
        <main className="previewGrid">
            {previews?.map(preview => {
                return (
                    <Preview key={preview._id} preview={preview}/>
                );
            })}
        </main>
    );
}