import "./Heading.scss";

import { useTranslations } from "next-intl";

import { HeadingSearchBar } from "./components/HeadingSearchBar";
import { HeadingToggleLanguage } from "./components/HeadingToggleLanguage";
import { IconCreate } from "@/components/icons/IconCreate";
import { IconGenerate } from "@/components/icons/IconGenerate";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useGenerate } from "./hooks/useGenerate";

import { useUserModalContext } from "../../context/userModal/UserModalContext";
import { SelectAll } from "../SelectAll";
import { Sort } from "../Sort";

export const Heading = () => {
    const { handleIsModalOpen } = useUserModalContext();
    const { mutate } = useGenerate();
    const t = useTranslations("HomePage");

    return (
        <div>
            <div className="Heading">
                <Typography
                    asChild
                    variant="fourth"
                >
                    <h1>{t("title")}</h1>
                </Typography>

                <div className="Heading-containerButton">
                    <HeadingSearchBar />
                    <HeadingToggleLanguage />
                </div>
            </div>
            <div className="Heading Heading--button">
                <Button
                    className="Heading-button"
                    size="maxMd"
                    type="button"
                    variant="primary"
                    onClick={handleIsModalOpen}
                >
                    {t("create")}
                    <IconCreate />
                </Button>
                <Button
                    className="Heading-button"
                    size="maxMd"
                    type="button"
                    variant="primary"
                    onClick={() => mutate()}
                >
                    {t("generate")}
                    <IconGenerate />
                </Button>
            </div>
            <div className="Heading Heading--filter">
                <SelectAll />
                <Sort />
            </div>
        </div>
    );
};
