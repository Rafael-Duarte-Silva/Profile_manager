import { ReactNode } from "react";

import { Button } from "@/components/ui/Button";

type DropdownTriggerProps = {
    children: ReactNode;
    variant?: "button" | undefined | null;
    className?: string;
};

export const DropdownTrigger = ({
    children,
    variant,
    className,
}: DropdownTriggerProps) => {
    if (!variant) {
        return <summary className={className}>{children}</summary>;
    }

    return (
        <Button
            asChild
            size="md"
            variant="text"
        >
            <summary className={className}>{children}</summary>
        </Button>
    );
};

