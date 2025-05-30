import "./ToggleLanguage.scss";

import { Link, routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconLanguages } from "@/components/icons/IconLanguages";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useToggleLanguage } from "./hooks/useToggleLanguage";

export const ToggleLanguage = () => {
    const { hrefWithoutLocale } = useToggleLanguage();
    const t = useTranslations("HomePage");

    return (
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
                <ul>
                    {routing.locales.map((locale) => (
                        <li
                            key={locale}
                            className="Heading-item"
                        >
                            <Typography
                                asChild
                                variant="second"
                                colors="DarkMedium"
                                text="lowerCase"
                            >
                                <Link
                                    href={hrefWithoutLocale()}
                                    locale={locale}
                                >
                                    {locale}
                                </Link>
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Button>
        </details>
    );
};

