import { useState } from "react";

import { UserData } from "@/interfaces/UserData";
import { UseFormSetValue } from "react-hook-form";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

import { userList } from "../../../contants/userList";

export const useEdit = (
    setValue: UseFormSetValue<UserMutateSchema>,
    handleIsModalOpen: () => void,
) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleUserEdit = (isEdit: boolean, userData?: UserData) => {
        setIsEdit(isEdit);
        handleIsModalOpen();

        [...userList, "fullName", "username"].forEach((key) => {
            setValue(
                key as keyof UserMutateSchema,
                userData ? userData[key as keyof UserData] : "",
            );
        });
    };

    return {
        isEdit,
        handleIsModalOpen,
        handleUserEdit,
    };
};

