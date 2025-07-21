import "./DropdownContent.scss";

import { ReactNode } from "react";

import { Button } from "@/components/ui/Button";

type DropdownContentProps = {
    children: ReactNode;
};

export const DropdownContent = ({ children }: DropdownContentProps) => {
    return (
        <Button
            asChild
            className="DropdownContent-modal"
        >
            <ul>{children}</ul>
        </Button>
    );
};

