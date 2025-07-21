import { UserData } from "@/interfaces/UserData";
import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

export type UserModalContextProps = {
    isEdit: boolean;
    isModalOpen: boolean;
    errors: FieldErrors<UserMutateSchema>;
    handleIsModalOpen(): void;
    handleUserEdit(isEdit: boolean, userData?: UserData): void;
    handleSendUserData: SubmitHandler<UserMutateSchema>;
    handleSubmit: UseFormHandleSubmit<UserMutateSchema>;
    register: UseFormRegister<UserMutateSchema>;
    setValue: UseFormSetValue<UserMutateSchema>;
};

