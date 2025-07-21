import { useState } from "react";

import { UserData } from "@/interfaces/UserData";

import { IsChecked } from "@/types/IsChecked";

export const useCheckbox = () => {
    const [allIsChecked, setAllIsChecked] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<IsChecked[]>([
        { checked: false, id: "" },
    ]);

    const initializeIsChecked = (data: UserData[]) => {
        const updatedIsChecked = data.map((userData) => ({
            checked: false,
            id: userData.id,
        }));
        setIsChecked(updatedIsChecked);
    };

    const handleAllIsChecked = () => {
        const updatedIsChecked = isChecked.map((item) => ({
            checked: !allIsChecked,
            id: item.id,
        }));
        setIsChecked(updatedIsChecked);

        setAllIsChecked(!allIsChecked);
    };

    const handleIsChecked = (position: number) => {
        const updatedIsChecked = isChecked.map((item, index) => ({
            checked: index === position ? !item.checked : item.checked,
            id: item.id,
        }));
        setIsChecked(updatedIsChecked);
    };

    return {
        initializeIsChecked,
        allIsChecked,
        handleAllIsChecked,
        isChecked,
        handleIsChecked,
    };
};
