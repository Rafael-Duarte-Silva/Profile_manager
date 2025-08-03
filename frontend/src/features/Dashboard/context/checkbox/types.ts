import { UserData } from "@/interfaces/UserData";

import { IsChecked } from "@/types/IsCheckedType";

export type CheckboxContextProps = {
    isChecked: IsChecked[];
    allIsChecked: boolean;
    initializeIsChecked: (data: UserData[]) => void;
    handleAllIsChecked: () => void;
    handleIsChecked: (position: number) => void;
};

