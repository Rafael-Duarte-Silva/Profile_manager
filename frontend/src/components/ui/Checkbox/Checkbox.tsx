import "./Checkbox.scss";

import { IconCheckbox } from "@/components/icons/IconCheckbox";

import { useAccessibilityKeyboard } from "@/hooks/useAccessibilityKeyboard";

type CheckboxProps = {
    index: number;
    checked: boolean | undefined;
    onchange(): void;
};

export const Checkbox = ({ index = 0, checked, onchange }: CheckboxProps) => {
    const { accessibilityKeyDown } = useAccessibilityKeyboard();

    return (
        <div>
            <input
                className="Checkbox-input"
                id={`checkboxInput${index}`}
                type="checkbox"
                checked={checked}
                onChange={onchange}
            />
            <label
                className="Checkbox-label"
                htmlFor={`checkboxInput${index}`}
                tabIndex={0}
                onKeyDown={accessibilityKeyDown}
            >
                <IconCheckbox className="Checkbox-icon" />
            </label>
        </div>
    );
};

