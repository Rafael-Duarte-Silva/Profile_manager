import { UserData } from "@/interfaces/UserData";
import {
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

export type UserModalContextProps = {
    isEdit: boolean;
    isModalOpen: boolean;
    errors: FieldErrors<UserMutateSchema>;
    handleIsModalOpen(): void;
    handleUserEdit(isEdit: boolean, userData?: UserData): void;
    handleSubmit: UseFormHandleSubmit<UserMutateSchema>;
    register: UseFormRegister<UserMutateSchema>;
};

