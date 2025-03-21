import "./Input.scss";

import { InputHTMLAttributes } from "react";

import { Typography } from "@/components/ui/Typography";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export const Input = ({ label = "", id = "", ...rest }: InputProps) => {
    return (
        <div className="Input-wrap">
            <Typography
                asChild
                variant="second"
                colors="DarkMedium"
            >
                <label htmlFor={id}>{label}</label>
            </Typography>

            <Typography
                asChild
                variant="second"
                colors="DarkMedium"
            >
                <input
                    className="Input"
                    id={id}
                    type="text"
                    {...rest}
                />
            </Typography>
        </div>
    );
};

