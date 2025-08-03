import "./Checkbox.scss";

import { IconCheckbox } from "@/components/icons/IconCheckbox";

import { useAccessibilityKeyboard } from "@/hooks/useAccessibilityKeyboard";

type CheckboxProps = {
    id: string;
    checked: boolean | undefined;
    onchange(): void;
};

export const Checkbox = ({ id = "", checked, onchange }: CheckboxProps) => {
    const { accessibilityKeyDown } = useAccessibilityKeyboard();

    return (
        <div>
            <input
                className="Checkbox-input"
                id={`checkboxInput${id}`}
                type="checkbox"
                checked={checked}
                onChange={onchange}
            />
            <label
                className="Checkbox-label"
                htmlFor={`checkboxInput${id}`}
                tabIndex={0}
                onKeyDown={accessibilityKeyDown}
            >
                <IconCheckbox className="Checkbox-icon" />
            </label>
        </div>
    );
};

