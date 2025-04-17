import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { UserMutateSchema } from "../types/UserMutateSchema";

const postData = async (data: UserMutateSchema): AxiosPromise<void> => {
    const response = api.post<void, UserMutateSchema>(
        "/auth/register/user",
        data,
    );
    return response;
};

export const useUserMutate = () => {
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
    });

    return mutate;
};
