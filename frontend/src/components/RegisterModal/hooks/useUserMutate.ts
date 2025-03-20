import { useMutation } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { UserMutateSchema } from "../types/UserMutateSchema";

const postData = async (data: UserMutateSchema): AxiosPromise<void> => {
    const response = axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/register/user", data);
    return response;
};

export const useUserMutate = () => {
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
    });

    return mutate;
};

