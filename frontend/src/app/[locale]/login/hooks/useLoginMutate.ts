import { useRouter } from "@/i18n/routing";
import { LoginData } from "@/interfaces/LoginData";
import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { setCookie } from "@/utils/setCookie";

interface LoginPromise {
    token: string;
    expiresIn: number;
}

const postData = (data: LoginData): AxiosPromise<LoginPromise> => {
    const response = api.post<LoginPromise, LoginData>("/auth/login", data);
    return response;
};

export const useLoginMutate = () => {
    const router = useRouter();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: (data) => {
            const response = data.data;
            setCookie("jwt", response.token, response.expiresIn);
            router.push("/");
        },
    });

    return mutate;
};
