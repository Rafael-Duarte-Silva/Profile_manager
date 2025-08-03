import { Ref } from "react";

import { UserData } from "@/interfaces/UserData";

export type TableContextProps = {
    ref: Ref<HTMLInputElement>;
    searchDefaultValue: string;
    page: string;
    sort: string;
    data: UserData[] | undefined;
    isOpenSearchBar: boolean;
    handleSort(e: React.MouseEvent<HTMLAnchorElement>, sort: string): void;
    handlePage(page: string): void;
    handleSearchKeyboard(e: React.KeyboardEvent): void;
    handleSearch(e: React.MouseEvent): void;
    handleIsOpenSearchBar(): void;
};

