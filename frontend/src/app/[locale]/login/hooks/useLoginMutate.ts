import { useRouter } from "@/i18n/routing";
import { LoginData } from "@/interface/LoginData";
import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { setCookie } from "@/utils/setCookie";

interface LoginPromise {
    token: string;
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
            setCookie("jwt", data.data.token, 2);
            router.push("/?sort=dateCreated&page=1");
        },
    });

    return mutate;
};
