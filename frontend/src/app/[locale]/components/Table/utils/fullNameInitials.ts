export const fullNameInitials = (fullName: string | undefined): string => {
    if (!fullName) {
        return "";
    }

    const initials = fullName.split(" ");

    return `${initials[0][0]}${initials[1][0]}`;
};

