export const IconSort = ({ className = "" }: { className?: string }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            fill="none"
            viewBox="0 0 25 24"
        >
            <path
                stroke="#534D59"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7.5 15l5 5 5-5M17.5 9l-5-5-5 5"
            ></path>
        </svg>
    );
};
