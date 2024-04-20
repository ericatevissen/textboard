import { PreviewInterface } from "./Preview";
import Preview from "./Preview";

export interface GridProps {
    previewList: PreviewInterface[]
    previewOrder: string
}

export default function PreviewGrid({ previewList, previewOrder } : GridProps) {
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