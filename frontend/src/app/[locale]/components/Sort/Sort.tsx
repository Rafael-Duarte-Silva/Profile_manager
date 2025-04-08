import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconSort } from "@/components/icons/IconSort";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useTableContext } from "../../context/TableContext";

export const Sort = ({ className = "" }: { className?: string }) => {
    const { handleSort, sort } = useTableContext();

    const labelList: string[] = [
        "user",
        "status",
        "email",
        "phone",
        "job",
        "date",
    ];

    const mappingLabel: { [key: string]: string } = {
        login: "user",
        status: "status",
        email: "email",
        phone: "phone",
        job: "job",
        dateCreated: "date",
    };

    const t = useTranslations("HomePage");

    return (
        <details
            className={`Heading-details${className ? " " + className : ""}`}
        >
            <summary className="Heading-row Heading-row--filter">
                <Typography colors="DarkMedium">
                    {t(mappingLabel[sort])}
                </Typography>
                <IconSort />
            </summary>

            <Button
                asChild
                className="Heading-Modal"
            >
                <div>
                    {labelList.map((value, index) => (
                        <Typography
                            key={index}
                            asChild
                            variant="second"
                            colors="DarkMedium"
                            className="Heading-Link"
                        >
                            <Link
                                href={`/?sort=${value}&page=1`}
                                locale="en"
                                onClick={(e) => handleSort(e, value)}
                            >
                                {t(value)}
                            </Link>
                        </Typography>
                    ))}
                </div>
            </Button>
        </details>
    );
};

