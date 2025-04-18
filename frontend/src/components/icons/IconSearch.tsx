export const IconSearch = ({
    className = "",
    onClick = () => {},
}: {
    className?: string;
    onClick(event: React.MouseEvent): void;
}) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="#534D59"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
            ></path>
        </svg>
    );
};
