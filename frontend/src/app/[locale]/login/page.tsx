"use client";

import "./page.scss";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";

import { useLoginForm } from "./hooks/useLoginForm";

export default function Login() {
    const { handleSubmit, handleSendLoginData, isPending, register } =
        useLoginForm();
    const t = useTranslations("HomePage");

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
                    {...register("username")}
                    label={t("username")}
                    id="usernameInput"
                    autoComplete="name"
                    placeholder="admin"
                    type="text"
                />
                <Input
                    {...register("password")}
                    label={t("password")}
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
                    {isPending ? t("sending") : t("login")}
                </Button>
            </form>
        </div>
    );
}
