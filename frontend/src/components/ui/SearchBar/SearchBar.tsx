import "./SearchBar.scss";

import { useTranslations } from "next-intl";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

type SearchBarProps = {
    onClickButton(): void;
    onclickIcon(e: React.MouseEvent<Element, MouseEvent>): void;
    onKeyDown(e: React.KeyboardEvent): void;
    onChange(e: React.ChangeEvent<Element>): void;
    deferredSearch: string;
    isOpenSearchBar: boolean;
    name: string;
};

export const SearchBar = ({
    deferredSearch,
    isOpenSearchBar,
    onClickButton,
    onclickIcon,
    onChange,
    onKeyDown,
    name,
}: SearchBarProps) => {
    const t = useTranslations("HomePage");

    return (
        <Button
            asChild
            size="md"
            type="button"
            variant="text"
            className={isOpenSearchBar ? "SearchBar is-open" : ""}
            onClick={onClickButton}
            onKeyDown={onKeyDown}
        >
            <label>
                <IconSearch onClick={onclickIcon} />
                <Typography
                    asChild
                    colors="DarkMedium"
                    className="SearchBar-input"
                    variant="second"
                >
                    <input
                        type="search"
                        placeholder={t("search")}
                        onChange={onChange}
                        defaultValue={deferredSearch}
                        name={name}
                    />
                </Typography>
            </label>
        </Button>
    );
};

