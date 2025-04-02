"use client";

import "./page.css";

import { useState } from "react";

import { useLoginMutate } from "./hooks/useLoginMutate";

import { Input } from "./Input";

export default function Login() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { mutate, isPending } = useLoginMutate();

    const submit = () => {
        mutate({ login, password });
    };

    return (
        <div className="Login">
            <div className="Login-wrap">
                <form>
                    <ul className="Login-listForm">
                        <li className="Login-itemForm">
                            <Input
                                id="login"
                                label="login"
                                value={login}
                                updateValue={setLogin}
                            />
                        </li>
                        <li className="Login-itemForm">
                            <Input
                                id="password"
                                label="password"
                                value={password}
                                updateValue={setPassword}
                            />
                        </li>
                    </ul>
                </form>
                <button
                    className="Login-button"
                    onClick={submit}
                >
                    {isPending ? "sending..." : "submit"}
                </button>
            </div>
        </div>
    );
}
