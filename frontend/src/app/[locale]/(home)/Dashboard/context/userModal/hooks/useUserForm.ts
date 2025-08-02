import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { userMutateSchema, UserMutateSchema } from "@/schemas/UserMutateSchema";

export const useUserForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserMutateSchema>({
        resolver: zodResolver(userMutateSchema),
        mode: "onBlur",
    });

    return { register, handleSubmit, setValue, errors };
};

