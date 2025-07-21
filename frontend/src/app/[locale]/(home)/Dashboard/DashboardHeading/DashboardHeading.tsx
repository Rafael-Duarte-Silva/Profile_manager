import "./DashboardHeading.scss";

import { useTranslations } from "next-intl";

import { IconCreate } from "@/components/icons/IconCreate";
import { IconGenerate } from "@/components/icons/IconGenerate";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { Typography } from "@/components/ui/Typography";

import { useGenerate } from "./hooks/useGenerate";

import { DashboardSort } from "../common/DashboardSort";
import { useTableContext } from "../context/table/TableContext";
import { useUserModalContext } from "../context/userModal/UserModalContext";
import { DashboardLanguage } from "./DashboardLanguage";
import { DashBoardSelectAll } from "./DashBoardSelectAll";

export const DashboardHeading = () => {
    const { handleIsModalOpen } = useUserModalContext();
    const { mutate } = useGenerate();
    const {
        deferredSearch,
        isOpenSearchBar,
        handleSearchKeyboard,
        handleSearch,
        updateSearch,
        handleIsOpenSearchBar,
    } = useTableContext();
    const t = useTranslations("HomePage");

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
                        deferredSearch={deferredSearch}
                        isOpenSearchBar={isOpenSearchBar}
                        onChange={updateSearch}
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
