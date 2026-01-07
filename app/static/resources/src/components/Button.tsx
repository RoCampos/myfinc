interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

function Button({ className, children }: ButtonProps) {
    return (
        <button className={`py-2 px-4 w-full rounded-xl text-sm ${className}`}>
            {children}
        </button>
    )
}

export default Button;
