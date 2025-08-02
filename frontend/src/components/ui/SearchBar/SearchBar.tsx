import "./SearchBar.scss";

import { Ref } from "react";

import { useTranslations } from "next-intl";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

type SearchBarProps = {
    ref: Ref<HTMLInputElement>;
    deferredSearch?: string;
    isOpenSearchBar: boolean;
    name: string;
    onClickButton(): void;
    onclickIcon(e: React.MouseEvent<Element, MouseEvent>): void;
    onKeyDown(e: React.KeyboardEvent): void;
    onChange?(e: React.ChangeEvent<Element>): void;
};

export const SearchBar = ({
    ref,
    deferredSearch,
    isOpenSearchBar,
    name,
    onClickButton,
    onclickIcon,
    onChange,
    onKeyDown,
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
                        ref={ref}
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

