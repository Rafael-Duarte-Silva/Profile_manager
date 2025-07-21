import { ReactNode } from "react";

import { useEdit } from "./hooks/useEdit";
import { useModal } from "./hooks/useModal";
import { useUserForm } from "./hooks/useUserForm";
import { useUserMutate } from "./hooks/useUserMutate";

import { UserModalContext } from "./UserModalContext";

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
    const modal = useModal();

    const { handleIsModalOpen } = modal;
    const { mutate } = useUserMutate();

    const userForm = useUserForm(mutate, handleIsModalOpen);

    const { setValue } = userForm;
    const edit = useEdit(setValue, handleIsModalOpen);

    return (
        <UserModalContext.Provider
            value={{
                ...edit,
                ...modal,
                ...userForm,
            }}
        >
            {children}
        </UserModalContext.Provider>
    );
};

