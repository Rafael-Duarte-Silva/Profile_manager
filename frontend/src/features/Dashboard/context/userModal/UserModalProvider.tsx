import { ReactNode, useMemo } from "react";

import { useModal } from "./hooks/useModal";
import { useUserForm } from "./hooks/useUserForm";

import { UserModalContext } from "./UserModalContext";

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
    const { setValue, ...userFormRest } = useUserForm();
    const modal = useModal(setValue);

    const contextValue = useMemo(
        () => ({
            ...modal,
            ...userFormRest,
        }),
        [modal.isEdit, modal.isModalOpen],
    );

    return (
        <UserModalContext.Provider value={contextValue}>
            {children}
        </UserModalContext.Provider>
    );
};

