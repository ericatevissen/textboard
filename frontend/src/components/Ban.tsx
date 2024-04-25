import { serverUrl } from "../App";
import banIcon from "/ban.svg";

interface banProps {
    ip: string | null
}

export default function Ban({ ip } : banProps) {
    async function ban() {
        if (!window.confirm("Are you sure you want to ban this user?")) return;

        const body = {
            ip: ip
        };
        const req = JSON.stringify(body);

        try {
            await fetch(`${serverUrl}/api/ban`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: req,
                credentials: "include"
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="ban" onClick={() => void ban()}><img src={banIcon}></img></button>
    );
}