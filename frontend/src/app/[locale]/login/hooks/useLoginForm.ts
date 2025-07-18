import { LoginData } from "@/interfaces/LoginData";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginMutateSchema } from "../constants/loginMutateSchema";

import { LoginMutateSchema } from "../types/LoginMutateSchema";

import { useLoginMutate } from "./useLoginMutate";

export const useLoginForm = () => {
    const { mutate, isPending } = useLoginMutate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginMutateSchema>({
        resolver: zodResolver(loginMutateSchema),
        mode: "onBlur",
    });

    const handleSendLoginData: SubmitHandler<LoginMutateSchema> = (
        data: LoginData,
    ) => {
        mutate(data);
    };

    return { register, handleSubmit, errors, handleSendLoginData, isPending };
};

