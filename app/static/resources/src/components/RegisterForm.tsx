import { Fieldset, Legend, Input, Field, Label } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

function RegisterForm() {

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">

            <form onSubmit={handleSubmit} >
                <Fieldset className="flex flex-col space-y-4 p-4 border border-gray-200 rounded">
                    <Legend className="text-2xl font-bold text-center">Register</Legend>
                    <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </Field>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">Register</button>
                </Fieldset>
            </form>

        </div>
    );
}

export default RegisterForm;