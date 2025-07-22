import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

const postData = (): AxiosPromise<void> => {
    const response = api.post<void, undefined>("/auth/register/generate");

    return response;
};

export const useGenerate = () => {
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
    });

    return mutate;
};
