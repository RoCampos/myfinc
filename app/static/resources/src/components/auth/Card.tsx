
interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

function Card({ className, children }: CardProps) {

    return (
        <div className={`flex flex-1 flex-col border border-finance-border rounded-lg p-6 ${className}`}>
            {children}
        </div>
    )
}

export default Card;