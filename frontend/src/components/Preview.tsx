import { useNavigate } from "react-router-dom";

export interface PreviewInterface {
    subject: string
    comment: string
    _id: number
}

interface PreviewProps {
    preview: PreviewInterface
}

export default function Preview({ preview } : PreviewProps) {
    const navigate = useNavigate();

    return (
        <div className="preview" id={preview._id.toString()} onClick={() => navigate(`/${preview._id}`)}>
            <h2>{preview.subject}</h2>
            <p>{preview.comment}</p>
        </div>
    );
}