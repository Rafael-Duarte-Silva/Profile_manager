export const IconCheckbox = ({ className = "" }: { className?: string }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 22 22"
        >
            <rect
                width="22"
                height="22"
                fill="#7839CD"
                rx="6"
            ></rect>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16.667 7l-7.334 7.333L6 11"
            ></path>
        </svg>
    );
};
