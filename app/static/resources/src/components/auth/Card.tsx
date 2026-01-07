
interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

function Card({ className, children }: CardProps) {

    return (
        <div className={`flex flex-col w-full border border-finance-border rounded-lg p-6 h-1/4 ${className}`}>
            {children}
        </div>
    )
}

export default Card;