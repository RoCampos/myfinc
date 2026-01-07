import { Input as InputHeadless } from "@headlessui/react"

interface InputProps {
    type?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
}

function Input({ type, placeholder, className, value, onChange, onFocus }: InputProps) {
    return (
        <InputHeadless
            type={type}
            placeholder={placeholder}
            className={'flex w-full p-4 rounded-xl data-[selected=false]:outline-none data-[selected=true]:outline data-[selected=true]:outline-finance-ink border border-finance-border ' + className}
            value={value}
            onChange={onChange}
            onFocus={onFocus} />
    )
}

export default Input
