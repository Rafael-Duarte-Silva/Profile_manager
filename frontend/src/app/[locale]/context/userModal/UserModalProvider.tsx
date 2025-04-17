import { ReactNode, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { userMutateSchema } from "../../components/UserModal/constants/userMutateSchema";
import { useUserMutate } from "../../components/UserModal/hooks/useUserMutate";
import { UserMutateSchema } from "../../components/UserModal/types/UserMutateSchema";

import { UserModalContext } from "./UserModalContext";

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { mutate } = useUserMutate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserMutateSchema>({
        resolver: zodResolver(userMutateSchema),
        mode: "onBlur",
    });

    const handleSendUserData: SubmitHandler<UserMutateSchema> = (data) => {
        mutate(data);
        handleIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleIsModalOpen = (isEdit: boolean) => {
        setIsEdit(isEdit);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <UserModalContext.Provider
            value={{
                isEdit,
                isModalOpen,
                handleIsModalOpen,
                register,
                handleSendUserData,
                handleSubmit,
                errors,
                setValue,
            }}
        >
            {children}
        </UserModalContext.Provider>
    );
};
