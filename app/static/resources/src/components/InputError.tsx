
interface InputErrorProps {
    category?: string;
    message?: string;
}

function InputError({ category, message }: InputErrorProps) {
    return (
        <p className="text-red-500">{message}</p>
    )
}

export default InputError;