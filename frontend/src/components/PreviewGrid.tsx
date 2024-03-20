import { PreviewInterface } from "./Preview";
import Preview from "./Preview";

export interface GridInterface {
    previewList: PreviewInterface[]
}

export default function PreviewGrid({ previewList } : GridInterface) {
    return (
        <main>
            {previewList.map(preview => {
                return (
                    <Preview key={preview._id} preview={preview}/>
                );
            })}
        </main>
    );
}