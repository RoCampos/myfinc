
interface IconButtonProps {
    label?: string;
    className?: string;
    icon?: React.ReactNode;
}

function IconButton({ icon, className, label }: IconButtonProps) {
    return (
        <button className={`flex gap-2 px-4 py-2 w-32 rounded-xl bg-finance-surface text-finance-ink border border-finance-border w-full hover:outline ${className}`}>
            {icon}
            <span>{label}</span>
        </button>
    )
}

export default IconButton;