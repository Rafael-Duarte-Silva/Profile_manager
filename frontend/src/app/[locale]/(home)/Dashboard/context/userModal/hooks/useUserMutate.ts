import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

const postUserRegister = (data: UserMutateSchema): AxiosPromise<void> => {
    const response = api.post<void, UserMutateSchema>("/auth/register", data);
    return response;
};

export const useUserMutate = () => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: postUserRegister,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    return { mutate };
};
