import { useState } from "react";

export const useTable = () => {
    const [allIsChecked, setAllIsChecked] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean[]>([false]);

    const initializeIsChecked = (length: number = 0) => {
        setIsChecked(new Array(length).fill(false));
    };

    const handleAllIsChecked = () => {
        const updatedIsChecked = isChecked.map(() => !allIsChecked);
        setIsChecked(updatedIsChecked);

        setAllIsChecked(!allIsChecked);
    };

    const handleIsChecked = (position: number) => {
        const updatedIsChecked = isChecked.map((item, index) => (index === position ? !item : item));
        setIsChecked(updatedIsChecked);
    };

    return { initializeIsChecked, allIsChecked, handleAllIsChecked, isChecked, handleIsChecked };
};

