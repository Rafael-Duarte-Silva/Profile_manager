export const IconCreate = ({ className = "" }: { className?: string }) => {
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
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v14M5 12h14"
            ></path>
        </svg>
    );
};
