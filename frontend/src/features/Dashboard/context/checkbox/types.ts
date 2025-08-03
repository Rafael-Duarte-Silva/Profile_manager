import { UserData } from "@/interfaces/UserData";

export type CheckboxContextProps = {
    isChecked: Map<string, boolean>;
    allIsChecked: boolean;
    initializeIsChecked: (data: UserData[]) => void;
    handleAllIsChecked: () => void;
    handleIsChecked: (id: string) => void;
};

