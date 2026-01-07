
interface InputErrorProps {
    message?: string;
}

function InputError({ message }: InputErrorProps) {
    return (
        <p className="text-red-500">{message}</p>
    )
}

export default InputError;