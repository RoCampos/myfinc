import { useForm, usePage } from "@inertiajs/react"
import { Fieldset, Field, Label } from "@headlessui/react"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Divider from "@/components/auth/Divider"
import IconButton from "@/components/IconButton"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import InputError from "@/components/InputError"
import { useState, useEffect } from "react"

interface FormProps {
    className?: string;
    action: string;
}


function Form({ className, action }: FormProps) {

    const { data, setData, post } = useForm({
        email: '',
        name: '',
        password: ''
    });

    const { flash } = usePage().props as any;

    // estado para controlar a visibilidade do erro
    const [visibleError, setVisibleError] = useState<string | null>(null);

    // monitoramento de erros
    useEffect(() => {
        if (flash?.message) {
            setVisibleError(flash.message);
        }
    }, [flash]);

    // limpeza de erro ao mudar de action
    useEffect(() => {
        setVisibleError(null);
    }, [action]);

    // limpeza de erro no foco ao input
    const clearError = () => setVisibleError(null);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(action, {
            onSuccess: () => {
                action === '/login' ?
                    console.log('Login realizado com sucesso!') :
                    console.log('Cadastro realizado com sucesso!')
            },
            onError: () => {
                console.log(`Erro ao realizar ${action}`);
            }
        });
    }

    return (
        <form onSubmit={onSubmit} className={`flex flex-col flex-1 gap-4 w-full h-full space-y-auto ${className}`}>
            <Fieldset className="flex gap-2">
                <Field className="flex-1 flex flex-col gap-2 text-finance-ink">
                    <Label className="font-semibold">Email</Label>
                    <Input type="email" placeholder="seuemail@seusite.com" value={data.email} onChange={(e) => setData('email', e.target.value)} onFocus={clearError} />
                    {visibleError && <InputError message={visibleError} />}
                </Field>
            </Fieldset>

            {action === '/register' && (
                <Fieldset className="flex gap-2">
                    <Field className="flex-1 flex flex-col gap-2 text-finance-ink">
                        <Label className="font-semibold">Nome</Label>
                        <Input type="text" placeholder="Seu nome" value={data.name} onChange={(e) => setData('name', e.target.value)} onFocus={clearError} />
                    </Field>
                </Fieldset>
            )}

            <Fieldset className="flex gap-2">
                <Field className="flex-1 flex flex-col gap-2 text-finance-ink">
                    <Label className="font-semibold">Senha</Label>
                    <Input type="password" placeholder="Sua senha" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                </Field>
            </Fieldset>
            <Button className="bg-finance-primary text-finance-surface w-full hover:bg-finance-primary/80">
                <span>Entrar</span>
            </Button>
            <Divider text="ou continue com" />
            <Fieldset className="flex gap-2">
                <IconButton
                    label="Entrar"
                    className=""
                    icon={<GoogleIcon />}
                />
                <IconButton
                    label="Entrar"
                    className=""
                    icon={<AppleIcon />}
                />
            </Fieldset>
        </form>
    )
}

export default Form;