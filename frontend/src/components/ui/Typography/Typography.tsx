import "./Typography.scss";

import { HTMLAttributes, ReactNode } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const typography = cva("Typography", {
    variants: {
        variant: {
            primary: "Typography--primary",
            second: "Typography--second",
            third: "Typography--third",
            fourth: "Typography--fourth",
        },
        colors: {
            light: "Typography--color-light",
            Medium: "Typography--color-medium",
            DarkMedium: "Typography--color-darkMedium",
        },
    },
});

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof typography> {
    asChild?: boolean;
    children?: ReactNode;
}

export const Typography = ({
    variant,
    colors,
    asChild = false,
    className = "",
    children,
    ...props
}: TypographyProps) => {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            className={typography({ variant, colors, className })}
            {...props}
        >
            {children}
        </Comp>
    );
};
