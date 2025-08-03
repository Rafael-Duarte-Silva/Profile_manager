import { createContext, useContext } from "react";

import { CheckboxContextProps } from "./types";

export const CheckboxContext = createContext<CheckboxContextProps | undefined>(
    undefined,
);

export const useCheckboxContext = () => {
    const checkboxContext = useContext(CheckboxContext);

    if (!checkboxContext) {
        throw new Error("Checkbox must be used within a CheckboxProvider");
    }

    return checkboxContext;
};
