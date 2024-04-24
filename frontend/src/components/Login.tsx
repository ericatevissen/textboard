import { useState } from "react";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function submitLogin() {
        const form = document.querySelector("form");

        if (form) {
            const formData = new FormData(form);
            const formObj = Object.fromEntries(formData);
            const payload = JSON.stringify(formObj);

            try {
                const response = await fetch(`${serverUrl}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: payload,
                    credentials: "include"
                });

                if (response.status !== 200) {
                    alert("the username or password is incorrect");
                }
                else {
                    navigate("/");
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <form className="login-form" action="" method="post" onSubmit={e => {
            e.preventDefault();
            void submitLogin();
        }}>
            <input type="text" name="user" value={user} placeholder="username"
                onChange={(e) => setUser(e.target.value)} required/>
            <input type="password" name="password" value={password} placeholder="password"
                onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Log in</button>
        </form>
    );
}