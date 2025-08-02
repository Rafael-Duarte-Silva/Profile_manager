import "./DropdownItem.scss";

import { ReactNode } from "react";

import { Typography } from "@/components/ui/Typography";

type DropdownItemProps = {
    children: ReactNode;
    id: string | number;
    lowerCase?: boolean;
};

export const DropdownItem = ({
    children,
    id,
    lowerCase,
}: DropdownItemProps) => {
    return (
        <li
            key={id}
            className="DropdownItem-item"
        >
            <Typography
                className="DropdownItem-link"
                asChild
                variant="second"
                colors="DarkMedium"
                {...(lowerCase ? { text: "lowerCase" } : {})}
            >
                {children}
            </Typography>
        </li>
    );
};

