"use client";

import "./page.scss";

import { useRouter } from "@/i18n/routing";
import { LoginData } from "@/interfaces/LoginData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

import {
    loginMutateSchema,
    LoginMutateSchema,
} from "@/schemas/LoginMutateSchema";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";

import { LoginPromise } from "./types";

import { setCookie } from "@/utils/setCookie";

import { postUserLogin } from "./LoginAPI";

export default function Login() {
    const t = useTranslations("LoginPage");

    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: postUserLogin,
        retry: 2,
        onSuccess: (data) => {
            const response: LoginPromise = data.data;
            setCookie("isLoggedIn", "true", response.expiresIn);
            router.push("/");
        },
    });

    const { register, handleSubmit } = useForm<LoginMutateSchema>({
        resolver: zodResolver(loginMutateSchema),
        mode: "onBlur",
    });

    const handleSendLoginData: SubmitHandler<LoginMutateSchema> = (
        data: LoginData,
    ) => {
        mutate(data);
    };

    return (
        <div className="Login">
            <form
                className="Login-form"
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
