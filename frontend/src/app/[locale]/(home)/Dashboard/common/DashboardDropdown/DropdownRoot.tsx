import "./DropdownRoot.scss";

import { ReactNode } from "react";

import { cva, VariantProps } from "class-variance-authority";

const dropdownRoot = cva("DropdownRoot-details", {
    variants: {
        variant: {
            primary: "DropdownRoot-details--primary",
        },
    },
});

type DropdownRootProps = {
    children: ReactNode;
    className?: string;
} & VariantProps<typeof dropdownRoot>;

export const DropdownRoot = ({
    children,
    variant,
    className,
}: DropdownRootProps) => {
    return (
        <details className={dropdownRoot({ variant, className })}>
            {children}
        </details>
    );
};

