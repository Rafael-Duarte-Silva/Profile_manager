import { createContext, ReactNode, useContext, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    FieldErrors,
    SubmitHandler,
    useForm,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

import { userMutateSchema } from "../components/UserModal/constants/userMutateSchema";
import { useUserMutate } from "../components/UserModal/hooks/useUserMutate";
import { UserMutateSchema } from "../components/UserModal/types/UserMutateSchema";

type UserModalContextProps = {
    isEdit: boolean;
    isModalOpen: boolean;
    handelIsModalOpen(isEdit: boolean): void;
    errors: FieldErrors<UserMutateSchema>;
    handelSendUserData: SubmitHandler<UserMutateSchema>;
    handleSubmit: UseFormHandleSubmit<UserMutateSchema>;
    register: UseFormRegister<UserMutateSchema>;
    setValue: UseFormSetValue<UserMutateSchema>;
};

export const UserModalContext = createContext<UserModalContextProps | undefined>(undefined);

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { mutate } = useUserMutate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserMutateSchema>({ resolver: zodResolver(userMutateSchema), mode: "onBlur" });

    const handelSendUserData: SubmitHandler<UserMutateSchema> = (data) => {
        mutate(data);
        handelIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handelIsModalOpen = (isEdit: boolean) => {
        setIsEdit(isEdit);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <UserModalContext.Provider
            value={{
                isEdit,
                isModalOpen,
                handelIsModalOpen,
                register,
                handelSendUserData,
                handleSubmit,
                errors,
                setValue,
            }}
        >
            {children}
        </UserModalContext.Provider>
    );
};

export const useUserModalContext = () => {
    const userModalContext = useContext(UserModalContext);

    if (!userModalContext) {
        throw new Error("UserModal must be used within a UserModalProvider");
    }

    return userModalContext;
};

