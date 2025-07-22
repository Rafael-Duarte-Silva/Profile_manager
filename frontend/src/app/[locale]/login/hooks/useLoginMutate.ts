import { useRouter } from "@/i18n/routing";
import { LoginData } from "@/interfaces/LoginData";
import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

interface LoginPromise {
    message: string;
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
            console.log(data.data.message);
            router.push("/");
        },
    });

    return mutate;
};
