export const useAccessibilityKeyboard = () => {
    const accessibilityKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            (event.target as HTMLElement).click();
        }
    };

    return { accessibilityKeyDown };
};
