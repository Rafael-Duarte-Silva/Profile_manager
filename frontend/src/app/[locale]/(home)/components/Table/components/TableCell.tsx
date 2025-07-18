import { useTranslations } from "next-intl";

import { Typography } from "@/components/ui/Typography";

type TableCellProps = {
    label: string;
    text: string;
    lowerCase?: boolean;
};

export const TableCell = ({
    label = "",
    text = "",
    lowerCase = false,
}: TableCellProps) => {
    const t = useTranslations("HomePage");

    return (
        <Typography
            asChild
            {...(lowerCase ? { text: "lowerCase" } : {})}
        >
            <td className="Table-cell">
                <Typography
                    asChild
                    colors="Medium"
                    className="Table-label"
                >
                    <span>{t(label)}</span>
                </Typography>
                {text}
            </td>
        </Typography>
    );
};
