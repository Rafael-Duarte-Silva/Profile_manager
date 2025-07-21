import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

const postData = (data: UserMutateSchema): AxiosPromise<void> => {
    const response = api.post<void, UserMutateSchema>("/auth/register", data);
    return response;
};

export const useUserMutate = () => {
    const { mutate } = useMutation({
        mutationFn: postData,
        retry: 2,
    });

    return { mutate };
};
