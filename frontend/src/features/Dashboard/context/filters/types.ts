import { Ref } from "react";

export type FiltersContextProps = {
    ref: Ref<HTMLInputElement>;
    searchDefaultValue: string;
    page: string;
    sort: string;
    isOpenSearchBar: boolean;
    endpoint: string;
    handleSort(e: React.MouseEvent<HTMLAnchorElement>, sort: string): void;
    handlePage(page: string): void;
    handleSearchKeyboard(e: React.KeyboardEvent): void;
    handleSearch(): void;
    handleIsOpenSearchBar(): void;
};

