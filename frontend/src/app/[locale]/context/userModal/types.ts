import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

import { UserMutateSchema } from "../../components/UserModal/types/UserMutateSchema";

export type UserModalContextProps = {
    isEdit: boolean;
    isModalOpen: boolean;
    handleIsModalOpen(isEdit: boolean): void;
    errors: FieldErrors<UserMutateSchema>;
    handleSendUserData: SubmitHandler<UserMutateSchema>;
    handleSubmit: UseFormHandleSubmit<UserMutateSchema>;
    register: UseFormRegister<UserMutateSchema>;
    setValue: UseFormSetValue<UserMutateSchema>;
};

