import "./DashboardCell.scss";

import { useTranslations } from "next-intl";

import { TableCell } from "@/components/prefabs/Table";
import { Typography } from "@/components/ui/Typography";

type DashboardCellProps = {
    label: string;
    text: string;
    lowerCase?: boolean;
};

export const DashboardCell = ({
    label = "",
    text = "",
    lowerCase = false,
}: DashboardCellProps) => {
    const t = useTranslations("HomePage");

    return (
        <TableCell lowerCase={lowerCase}>
            <>
                <Typography
                    asChild
                    colors="Medium"
                    className="DashboardCell-label"
                >
                    <span>{t(label)}</span>
                </Typography>
                {text}
            </>
        </TableCell>
    );
};
