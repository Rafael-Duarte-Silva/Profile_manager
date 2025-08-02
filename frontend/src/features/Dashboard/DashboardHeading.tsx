import "./DashboardHeading.scss";

import { Link, routing, usePathname } from "@/i18n/routing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { IconCreate } from "@/components/icons/IconCreate";
import { IconGenerate } from "@/components/icons/IconGenerate";
import { IconLanguages } from "@/components/icons/IconLanguages";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { Typography } from "@/components/ui/Typography";

import { useTableContext } from "./context/table/TableContext";
import { useUserModalContext } from "./context/userModal/UserModalContext";
import { DashboardDropdown } from "./DashboardDropdown";
import { postUserGenerate } from "./DashboardHeadingAPI";
import { DashboardSort } from "./DashboardSort";

export const DashboardHeading = () => {
    const { handleIsModalOpen } = useUserModalContext();
    const {
        ref,
        searchDefaultValue,
        isOpenSearchBar,
        handleSearchKeyboard,
        handleSearch,
        handleIsOpenSearchBar,
    } = useTableContext();
    const t = useTranslations("HomePage");

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: postUserGenerate,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    return (
        <div>
            <div className="DashboardHeading">
                <Typography
                    asChild
                    variant="fourth"
                >
                    <h1>{t("title")}</h1>
                </Typography>

                <div className="DashboardHeading-containerButton">
                    <SearchBar
                        ref={ref}
                        deferredSearch={searchDefaultValue}
                        isOpenSearchBar={isOpenSearchBar}
                        onKeyDown={handleSearchKeyboard}
                        onClickButton={handleIsOpenSearchBar}
                        onclickIcon={handleSearch}
                        name="searchBar"
                    />
                    <DashboardLanguage />
                </div>
            </div>
            <div className="DashboardHeading DashboardHeading--button">
                <Button
                    className="DashboardHeading-button"
                    size="md"
                    type="button"
                    variant="primary"
                    onClick={handleIsModalOpen}
                >
                    {t("create")}
                    <IconCreate />
                </Button>
                <Button
                    className="DashboardHeading-button"
                    size="md"
                    type="button"
                    variant="primary"
                    onClick={() => mutate()}
                >
                    {t("generate")}
                    <IconGenerate />
                </Button>
            </div>
            <div className="DashboardHeading  DashboardHeading--filter">
                <DashBoardSelectAll />
                <DashboardSort />
            </div>
        </div>
    );
};

const DashboardLanguage = () => {
    const t = useTranslations("HomePage");

    const pathname = usePathname();
    const searchParams = useSearchParams().toString();

    const hrefWithoutLocale = () => {
        return `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    };

    return (
        <DashboardDropdown.Root variant="primary">
            <DashboardDropdown.Trigger variant="button">
                <IconLanguages />
                <Typography
                    asChild
                    variant="second"
                    colors="DarkMedium"
                >
                    <span>{t("language")}</span>
                </Typography>
            </DashboardDropdown.Trigger>
            <DashboardDropdown.Content>
                {routing.locales.map((locale, index) => (
                    <DashboardDropdown.Item
                        lowerCase
                        key={index}
                        id={index}
                    >
                        <Link
                            href={hrefWithoutLocale()}
                            locale={locale}
                        >
                            {locale}
                        </Link>
                    </DashboardDropdown.Item>
                ))}
            </DashboardDropdown.Content>
        </DashboardDropdown.Root>
    );
};

const DashBoardSelectAll = () => {
    const { allIsChecked, handleAllIsChecked } = useTableContext();
    const t = useTranslations("HomePage");

    return (
        <div className="DashboardHeading-selectAll">
            <Checkbox
                index={-1}
                onchange={handleAllIsChecked}
                checked={allIsChecked}
            />
            <Typography colors="DarkMedium">{t("select")}</Typography>
        </div>
    );
};
