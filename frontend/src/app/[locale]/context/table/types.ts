import { UserData } from "@/interface/UserData";

import { IsChecked } from "./hooks/useCheckbox";

export type TableContextProps = {
    initializeIsChecked: (data: UserData[]) => void;
    allIsChecked: boolean;
    handleAllIsChecked: () => void;
    isChecked: IsChecked[];
    handleIsChecked: (position: number) => void;
    page: string;
    sort: string;
    deferredSearch: string;
    handleSort(e: React.MouseEvent<HTMLAnchorElement>, sort: string): void;
    handlePage(page: string): void;
    data: UserData[] | undefined;
    handleSarchKeyboard(e: React.KeyboardEvent): void;
    updateSearch(e: React.ChangeEvent): void;
    handleSearch(e: React.MouseEvent): void;
    isOpenSearchBar: boolean;
    handleIsOpenSearchBar(): void;
};

