export const IconEdit = ({ className = "" }: { className?: string }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="#959595"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"
            ></path>
        </svg>
    );
};
