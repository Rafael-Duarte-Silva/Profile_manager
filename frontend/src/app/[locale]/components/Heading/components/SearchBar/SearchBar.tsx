import "./SearchBar.scss";

import { useTableContext } from "@/app/[locale]/context/table/TableContext";
import { useTranslations } from "next-intl";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

export const SearchBar = () => {
    const {
        deferredSearch,
        handleSarchKeyboard,
        handleSearch,
        updateSearch,
        isOpenSearchBar,
        handleIsOpenSearchBar,
    } = useTableContext();
    const t = useTranslations("HomePage");

    return (
        <Button
            asChild
            size="maxMd"
            type="button"
            variant="text"
            className={isOpenSearchBar ? "SearchBar is-open" : ""}
            onClick={handleIsOpenSearchBar}
            onKeyDown={handleSarchKeyboard}
        >
            <label>
                <IconSearch onClick={handleSearch} />
                <Typography
                    asChild
                    variant="second"
                    colors="Medium"
                    className="SearchBar-input"
                >
                    <input
                        type="search"
                        placeholder={t("search")}
                        onChange={updateSearch}
                        defaultValue={deferredSearch}
                    />
                </Typography>
            </label>
        </Button>
    );
};
