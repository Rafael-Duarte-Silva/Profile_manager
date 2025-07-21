import "./TableLabel.scss";

import { ReactNode, TableHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { Typography } from "@/components/ui/Typography";

const tableLabel = cva("TableLabel", {
    variants: {
        variant: {
            user: "TableLabel--user",
        },
    },
});

interface TableLabelProps
    extends TableHTMLAttributes<HTMLTableCaptionElement>,
        VariantProps<typeof tableLabel> {
    className?: string;
    children: ReactNode;
}

export const TableLabel = ({
    variant,
    className = "",
    children,
    ...props
}: TableLabelProps) => {
    return (
        <Typography
            asChild
            colors="DarkMedium"
            className={tableLabel({ variant, className })}
            {...props}
        >
            <th>{children}</th>
        </Typography>
    );
};

