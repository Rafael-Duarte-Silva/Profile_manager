import { useTranslations } from "next-intl";

import { Typography } from "@/components/ui/Typography";

type TableLabelProps = {
    label: string;
};

export const TableLabel = ({ label = "" }: TableLabelProps) => {
    const t = useTranslations("HomePage");

    return (
        <Typography
            asChild
            colors="DarkMedium"
            className="Table-head-cell"
        >
            <th>{t(label)}</th>
        </Typography>
    );
};
