import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import banIcon from "/ban.svg";

interface banProps {
    ip: string | null
}

export default function Ban({ ip } : banProps) {
    const navigate = useNavigate();

    async function ban() {
        if (!confirm("Are you sure you want to ban this user?")) return;

        const body = {
            ip: ip
        };
        const req = JSON.stringify(body);

        try {
            const response = await fetch(`${serverUrl}/api/ban`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: req,
                credentials: "include",
            });

            if (response.status === 401) navigate("/login");
            if (response.status === 400) alert("This user is already banned");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="ban" onClick={() => void ban()}><img src={banIcon}></img></button>
    );
}