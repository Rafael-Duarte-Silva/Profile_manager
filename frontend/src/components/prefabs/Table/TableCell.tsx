import "./TableCell.scss";

import { ReactNode, TableHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { Typography } from "@/components/ui/Typography";

const tableCell = cva("TableCell", {
    variants: {
        variant: {
            icons: "TableCell--icons",
            user: "TableCell--user",
        },
    },
});

interface TableCellProps
    extends TableHTMLAttributes<HTMLTableCellElement>,
        VariantProps<typeof tableCell> {
    lowerCase?: boolean;
    className?: string;
    children: ReactNode;
}

export const TableCell = ({
    variant,
    lowerCase = false,
    className = "",
    children,
    ...props
}: TableCellProps) => {
    return (
        <Typography
            asChild
            {...(lowerCase ? { text: "lowerCase" } : {})}
        >
            <td
                className={tableCell({ variant, className })}
                {...props}
            >
                {children}
            </td>
        </Typography>
    );
};
