export const fullNameInitials = (fullName: string | undefined): string => {
    if (!fullName) {
        return "";
    }

    return fullName
        .split(" ")
        .map((word) => word.charAt(0).toLowerCase())
        .join("");
};
