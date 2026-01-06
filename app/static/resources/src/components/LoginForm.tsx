import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react"
import { useForm } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"


function LoginForm() {

    const { data, setData, post, errors } = useForm({
        email: '',
        password: ''
    });

    const { flash } = usePage().props as any;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/login', {
            onSuccess: () => {
                console.log('Login realizado com sucesso!');
            },
            onError: () => {
                console.log('Erro ao realizar login!');
            }
        });


    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit}>
                <Fieldset className="flex flex-col space-y-4 p-4 border border-gray-200 rounded">
                    <Legend className="text-2xl font-bold text-center">Login</Legend>
                    <Field className="space-y-2">
                        <Label htmlFor="email" className="block">Email</Label>
                        <Input type="email" id="email" name="email" className="block w-full rounded" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {flash?.message && <p className="text-red-500">{flash?.message}</p>}
                    </Field>
                    <Field className="space-y-2">
                        <Label htmlFor="password" className="block">Senha</Label>
                        <Input type="password" id="password" name="password" className="block w-full rounded" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                    </Field>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">Login</button>
                </Fieldset>
            </form>
        </div >
    );
}

export default LoginForm;