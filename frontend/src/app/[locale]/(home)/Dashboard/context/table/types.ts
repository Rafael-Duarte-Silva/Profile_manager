import { UserData } from "@/interfaces/UserData";

import { IsChecked } from "@/types/IsChecked";

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
    handleSearchKeyboard(e: React.KeyboardEvent): void;
    updateSearch(e: React.ChangeEvent): void;
    handleSearch(e: React.MouseEvent): void;
    isOpenSearchBar: boolean;
    handleIsOpenSearchBar(): void;
};

