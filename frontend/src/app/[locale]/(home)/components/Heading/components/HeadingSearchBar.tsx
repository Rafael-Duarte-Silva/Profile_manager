import { useTableContext } from "@/app/[locale]/(home)/context/table/TableContext";
import { useTranslations } from "next-intl";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

export const HeadingSearchBar = () => {
    const {
        deferredSearch,
        handleSearchKeyboard,
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
            className={isOpenSearchBar ? "Heading-searchBar is-open" : ""}
            onClick={handleIsOpenSearchBar}
            onKeyDown={handleSearchKeyboard}
        >
            <label>
                <IconSearch onClick={handleSearch} />
                <Typography
                    asChild
                    colors="DarkMedium"
                    className="Heading-input"
                    variant="second"
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
