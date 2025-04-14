import "./SearchBar.scss";

import { useTranslations } from "next-intl";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useTableContext } from "../../context/TableContext";

export const SearchBar = () => {
    const {
        handleSarchKeyboard,
        handleSearch,
        search,
        setSearch,
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
                        onChange={(e) =>
                            setSearch({
                                ...search,
                                value: e.target.value,
                            })
                        }
                        value={search.value}
                    />
                </Typography>
            </label>
        </Button>
    );
};
