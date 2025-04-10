"use client";

import "./page.scss";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useLoginForm } from "./hooks/useLoginForm";

export default function Login() {
    const { handleSubmit, handleSendLoginData, isPending, register } =
        useLoginForm();

    return (
        <div className="Login">
            <form
                className="Login-wrap"
                onSubmit={handleSubmit(handleSendLoginData)}
            >
                <Typography
                    asChild
                    variant="fourth"
                >
                    <h1>login</h1>
                </Typography>

                <Input
                    {...register("login")}
                    label="login"
                    id="loginInput"
                    autoComplete="name"
                    placeholder="admin"
                    type="text"
                />
                <Input
                    {...register("password")}
                    label="password"
                    id="passwordInput"
                    autoComplete="current-password"
                    placeholder="********"
                    type="password"
                />
                <Button
                    className="Login-button"
                    variant="primary"
                    type="submit"
                >
                    {isPending ? "sending..." : "login"}
                </Button>
            </form>
        </div>
    );
}
