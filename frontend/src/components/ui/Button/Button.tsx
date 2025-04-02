import "./Button.scss";

import { ButtonHTMLAttributes, ReactNode } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const button = cva("Button", {
    variants: {
        variant: {
            primary: "Button--primary",
            text: "Button--text",
        },
        size: {
            maxMd: "Button--w-max-h-md",
        },
    },
});

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {
    asChild?: boolean;
    children?: ReactNode;
}

export const Button = ({
    variant,
    size,
    asChild = false,
    className = "",
    children,
    ...props
}: ButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={button({ variant, size, className })}
            {...props}
        >
            {children}
        </Comp>
    );
};
