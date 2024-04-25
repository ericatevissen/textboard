import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import removeIcon from "/remove.svg";

interface RemoveProps {
    postId: number
    parentId: number | null
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Remove({ postId, parentId, setRefresh } : RemoveProps) {
    const navigate = useNavigate();
    const body = {
        postId: postId,
        parentId: parentId,
    };
    const req = JSON.stringify(body);

    async function remove() {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(`${serverUrl}/api/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: req,
                credentials: "include"
            });
            
            if (response.status === 200 && body.parentId) setRefresh(true);
            else if (response.status === 200) navigate("/");
            else navigate("/login");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="remove" onClick={() => void remove()}><img src={removeIcon} alt="remove button"/></button>
    );
}