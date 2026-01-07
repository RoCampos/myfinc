interface DividerProps {
    text?: string;
}


function Divider({ text }: DividerProps) {
    return (
        <div className="flex gap-2 w-full h-min items-center">
            <span className="text-finance-slate">{text}</span> <hr className="flex-1 border-finance-border" />
        </div>
    )
}

export default Divider;