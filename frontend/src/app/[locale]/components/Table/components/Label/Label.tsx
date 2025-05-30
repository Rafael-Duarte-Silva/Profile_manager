import { useTranslations } from "next-intl";

import { Typography } from "@/components/ui/Typography";

type LabelProps = {
    label: string;
};

export const Label = ({ label = "" }: LabelProps) => {
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
