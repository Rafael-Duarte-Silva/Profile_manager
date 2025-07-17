import { createContext, useContext } from "react";

import { UserModalContextProps } from "./types";

export const UserModalContext = createContext<
    UserModalContextProps | undefined
>(undefined);

export const useUserModalContext = () => {
    const userModalContext = useContext(UserModalContext);

    if (!userModalContext) {
        throw new Error("UserModal must be used within a UserModalProvider");
    }

    return userModalContext;
};
