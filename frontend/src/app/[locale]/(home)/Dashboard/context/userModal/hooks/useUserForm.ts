import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { userMutateSchema, UserMutateSchema } from "@/schemas/UserMutateSchema";

export const useUserForm = (
    mutate: (data: UserMutateSchema) => void,
    handleIsModalOpen: () => void,
) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserMutateSchema>({
        resolver: zodResolver(userMutateSchema),
        mode: "onBlur",
    });

    const handleSendUserData: SubmitHandler<UserMutateSchema> = (data) => {
        mutate(data);
        handleIsModalOpen();
    };

    const form = {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    };

    return { ...form, errors, handleSendUserData };
};

