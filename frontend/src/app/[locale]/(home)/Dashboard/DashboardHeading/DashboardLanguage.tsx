import { Link, routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconLanguages } from "../../../../../components/icons/IconLanguages";
import { Typography } from "@/components/ui/Typography";

import { useToggleLanguage } from "./hooks/useToggleLanguage";

import { DashboardDropdown } from "../common/DashboardDropdown";

export const DashboardLanguage = () => {
    const { hrefWithoutLocale } = useToggleLanguage();
    const t = useTranslations("HomePage");

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

/* <details className="DashboardHeading-details">
            <Button
                asChild
                size="md"
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
                className="DashboardToggleLanguage-modal"
            >
                <ul>
                    {routing.locales.map((locale) => (
                        <li
                            key={locale}
                            className="DashboardToggleLanguage-item"
                        >
                            <Typography
                                className="DashboardToggleLanguage-link"
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
        </details> */

