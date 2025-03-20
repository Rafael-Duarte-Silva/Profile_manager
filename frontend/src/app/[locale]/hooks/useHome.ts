import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

const postData = (): AxiosPromise<void> => {
    const response = axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/register/generate");
    return response;
};

export const useHome = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    const { mutate } = useMutation({
        mutationFn: postData,
        retry: 2,
    });

    return { mutate, isModalOpen, handleModalOpen };
};

