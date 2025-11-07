import { useState } from "react";

import { UserData } from "@/interfaces/UserData";
import { UseFormSetValue } from "react-hook-form";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

export const useModal = (setValue: UseFormSetValue<UserMutateSchema>) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleIsModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleUserEdit = (isEdit: boolean, userData?: UserData) => {
        setIsEdit(isEdit);
        setUserData(userData ?? null);

        [
            "username",
            "fullName",
            "email",
            "phone",
            "job",
            "dateCreated",
        ].forEach((key) => {
            setValue(
                key as keyof UserMutateSchema,
                userData ? userData[key as keyof UserData] : "",
            );
        });

        handleIsModalOpen();
    };

    return { userData, isModalOpen, isEdit, handleIsModalOpen, handleUserEdit };
};

