import { useState } from "react";

import { userList } from "@/contants/userList";
import { UserData } from "@/interfaces/UserData";
import { UseFormSetValue } from "react-hook-form";

import { UserMutateSchema } from "../types/UserMutateSchema";

export const useEdit = (
    setValue: UseFormSetValue<UserMutateSchema>,
    handleIsModalOpen: () => void,
) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleUserEdit = (isEdit: boolean, userData?: UserData) => {
        setIsEdit(isEdit);
        handleIsModalOpen();

        if (!isEdit || !userData) {
            return;
        }

        [...userList, "fullName", "username"].forEach((key) => {
            setValue(
                key as keyof UserMutateSchema,
                userData[key as keyof UserData],
            );
        });
    };

    return {
        isEdit,
        handleIsModalOpen,
        handleUserEdit,
    };
};

