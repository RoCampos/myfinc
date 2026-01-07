interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

function Button({ className, children }: ButtonProps) {
    return (
        <button className={`p-4 w-full rounded-xl ${className}`}>
            {children}
        </button>
    )
}

export default Button;
