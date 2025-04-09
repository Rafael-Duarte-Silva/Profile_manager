import "./Heading.scss";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { IconCreate } from "@/components/icons/IconCreate";
import { IconGenerate } from "@/components/icons/IconGenerate";
import { IconLanguages } from "@/components/icons/IconLanguages";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useGenerate } from "./hooks/useGenerate";

import { useTableContext } from "../../context/TableContext";
import { useUserModalContext } from "../../context/UserModalContext";
import { SearchBar } from "../SearchBar";
import { Sort } from "../Sort";

export const Heading = () => {
    const { allIsChecked, handleAllIsChecked } = useTableContext();
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
                    <SearchBar />
                    <details className="Heading-details">
                        <Button
                            asChild
                            size="maxMd"
                            variant="text"
                        >
                            <summary>
                                <IconLanguages />
                                <Typography
                                    asChild
                                    variant="second"
                                    colors="DarkMedium"
                                >
                                    <span>{t("language")}</span>
                                </Typography>
                            </summary>
                        </Button>

                        <Button
                            asChild
                            className="Heading-modal"
                        >
                            <div>
                                <Typography
                                    asChild
                                    variant="second"
                                    colors="DarkMedium"
                                    text="lowerCase"
                                    className="Heading-link"
                                >
                                    <Link
                                        href="/?page=1"
                                        locale="en"
                                    >
                                        en
                                    </Link>
                                </Typography>
                                <Typography
                                    asChild
                                    variant="second"
                                    colors="DarkMedium"
                                    text="lowerCase"
                                    className="Heading-link"
                                >
                                    <Link
                                        href="/?page=1"
                                        locale="pt-BR"
                                    >
                                        pt-BR
                                    </Link>
                                </Typography>
                            </div>
                        </Button>
                    </details>
                </div>
            </div>
            <div className="Heading Heading--button">
                <Button
                    className="Heading-button"
                    size="maxMd"
                    type="button"
                    variant="primary"
                    onClick={() => handleIsModalOpen(false)}
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
                <div className="Heading-row Heading-row--selectAll">
                    <div>
                        <input
                            className="Table-profile-input"
                            id="profileInputAll"
                            type="checkbox"
                            checked={allIsChecked}
                            onChange={handleAllIsChecked}
                        />
                        <label
                            className="Table-profile-label"
                            htmlFor="profileInputAll"
                        >
                            <IconCheckbox className="Table-iconProfile" />
                        </label>
                    </div>
                    <Typography colors="DarkMedium">{t("select")}</Typography>
                </div>

                <Sort />
            </div>
        </div>
    );
};
