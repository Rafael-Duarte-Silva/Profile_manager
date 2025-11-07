import { ReactNode, useMemo, useState } from "react";

import { UserData } from "@/interfaces/UserData";

import { UserModalContext } from "./UserModalContext";

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isCreateModalOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const handleIsCreateModalOpen = () => {
        setIsModalCreateOpen(!isCreateModalOpen);
    };

    const handleIsEditModalOpen = (userData?: UserData) => {
        setIsEditModalOpen(!isEditModalOpen);
        setUserData(userData ?? null);
    };

    const contextValue = useMemo(
        () => ({
            userData,
            isCreateModalOpen,
            isEditModalOpen,
            handleIsCreateModalOpen,
            handleIsEditModalOpen,
        }),
        [userData, isCreateModalOpen, isEditModalOpen],
    );

    return (
        <UserModalContext.Provider value={contextValue}>
            {children}
        </UserModalContext.Provider>
    );
};

