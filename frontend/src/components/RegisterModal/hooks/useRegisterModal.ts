import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { userMutateSchema } from "../constants/userMutateSchema";

import { UserMutateSchema } from "../types/UserMutateSchema";

import { useUserMutate } from "./useUserMutate";

export const useRegisterModal = (handleModalOpen: () => void) => {
    const { mutate } = useUserMutate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserMutateSchema>({ resolver: zodResolver(userMutateSchema), mode: "onBlur" });

    const handleRegisterModal: SubmitHandler<UserMutateSchema> = (data) => {
        mutate(data);
        handleModalOpen();
    };

    return { register, handleSubmit, errors, handleRegisterModal };
};

