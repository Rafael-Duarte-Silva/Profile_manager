import { ReactNode } from "react";

import { useModal } from "./hooks/useModal";
import { useUserForm } from "./hooks/useUserForm";

import { UserModalContext } from "./UserModalContext";

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
    const userForm = useUserForm();

    const { setValue, ...userFormRest } = userForm;
    const modal = useModal(setValue);

    return (
        <UserModalContext.Provider
            value={{
                ...modal,
                ...userFormRest,
            }}
        >
            {children}
        </UserModalContext.Provider>
    );
};

