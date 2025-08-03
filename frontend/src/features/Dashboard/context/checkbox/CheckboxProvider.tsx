import { ReactNode, useMemo, useState } from "react";

import { UserData } from "@/interfaces/UserData";

import { CheckboxContext } from "./CheckboxContext";

export const CheckboxProvider = ({ children }: { children: ReactNode }) => {
    const [allIsChecked, setAllIsChecked] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<Map<string, boolean>>(new Map());

    const initializeIsChecked = (data: UserData[]) => {
        const updateIsChecked = new Map();
        data.forEach((user) => {
            updateIsChecked.set(user.id, isChecked.get(user.id) || false);
        });
        setIsChecked(updateIsChecked);
    };

    const handleAllIsChecked = () => {
        const updateIsChecked = new Map(isChecked);
        updateIsChecked.forEach((_, key) => {
            updateIsChecked.set(key, !allIsChecked);
        });
        setIsChecked(updateIsChecked);
        setAllIsChecked(!allIsChecked);
    };

    const handleIsChecked = (id: string) => {
        if (!isChecked.has(id)) {
            return;
        }

        const updateIsChecked = new Map(isChecked.set(id, !isChecked.get(id)));
        setIsChecked(updateIsChecked);
    };

    const contextValue = useMemo(
        () => ({
            isChecked,
            allIsChecked,
            initializeIsChecked,
            handleAllIsChecked,
            handleIsChecked,
        }),
        [isChecked, allIsChecked],
    );

    return (
        <CheckboxContext.Provider value={contextValue}>
            {children}
        </CheckboxContext.Provider>
    );
};

