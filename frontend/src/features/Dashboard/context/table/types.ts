import { Ref } from "react";

import { UserData } from "@/interfaces/UserData";

import { IsChecked } from "@/types/IsCheckedType";

export type TableContextProps = {
    ref: Ref<HTMLInputElement>;
    searchDefaultValue: string;
    isChecked: IsChecked[];
    allIsChecked: boolean;
    page: string;
    sort: string;
    data: UserData[] | undefined;
    isOpenSearchBar: boolean;
    initializeIsChecked: (data: UserData[]) => void;
    handleAllIsChecked: () => void;
    handleIsChecked: (position: number) => void;
    handleSort(e: React.MouseEvent<HTMLAnchorElement>, sort: string): void;
    handlePage(page: string): void;
    handleSearchKeyboard(e: React.KeyboardEvent): void;
    handleSearch(e: React.MouseEvent): void;
    handleIsOpenSearchBar(): void;
};

