import "./Heading.scss";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { IconCreate } from "@/components/icons/IconCreate";
import { IconGenerate } from "@/components/icons/IconGenerate";
import { IconLanguages } from "@/components/icons/IconLanguages";
import { IconSort } from "@/components/icons/IconSort";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useGenerate } from "./hooks/useGenerate";

import { useUserModalContext } from "../../context/UserModalContext";
import { SearchBar } from "../SearchBar";

export const Heading = () => {
    const { handelIsModalOpen } = useUserModalContext();
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
                    <details className="Heading-containerLanguage">
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
                                    <span>Language</span>
                                </Typography>
                            </summary>
                        </Button>

                        <Button
                            asChild
                            className="Heading-languageModal"
                        >
                            <div>
                                <Typography
                                    asChild
                                    variant="second"
                                    colors="DarkMedium"
                                    className="Heading-Link"
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
                                    className="Heading-Link"
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
                    onClick={() => handelIsModalOpen(false)}
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

                <div className="Heading-row Heading-row--filter">
                    <Typography colors="DarkMedium">{t("date")}</Typography>
                    <IconSort />
                </div>
            </div>
        </div>
    );
};

