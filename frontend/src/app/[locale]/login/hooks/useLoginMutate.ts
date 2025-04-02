import { useRouter } from "@/i18n/routing";
import { LoginData } from "@/interface/LoginData";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { setCookie } from "@/utils/setCookie";

interface LoginPromise {
    token: string;
}

const postData = (data: LoginData): AxiosPromise<LoginPromise> => {
    const response = axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        data,
    );
    return response;
};

export const useLoginMutate = () => {
    const router = useRouter();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: (data) => {
            setCookie("jwt", data.data.token, 2);
            router.push("/?page=1");
        },
    });

    return mutate;
};
