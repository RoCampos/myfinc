
import { Tab as TabHeadless, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import AuthForm from "@/components/auth/AuthForm"
import { useState } from "react"


interface TabProps {
    title?: string;
    children?: React.ReactNode;
}
function Tab({ title, children }: TabProps) {
    return (
        <TabHeadless className={
            "bg-finance-surface text-finance-ink font-semibold rounded-xl text-center text-sm w-28 py-2 outline-none data-selected:bg-finance-ink data-selected:text-finance-surface data-selected:hover:bg-finance-slate/80"
        }>
            {title}
            {children}
        </TabHeadless>
    )
}

function AuthTab() {

    const [title, setTitle] = useState("Entrar")
    const [subtitle, setSubtitle] = useState("Use seu email para acessar sua conta")
    const [selectedIndex, setSelectedIndex] = useState(0)

    function handleTabChange(index: number) {
        setSelectedIndex(index)
        setTitle(selectedIndex === 1 ? "Entrar" : "Cadastro")
        setSubtitle(selectedIndex === 1 ? "Use seu email para acessar sua conta" : "Crie sua conta com seu email")
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>

            <TabGroup onChange={(index) => handleTabChange(index)} className="flex flex-col h-full gap-4">
                <TabList className="flex self-center border border-finance-border rounded-xl w-auto justify-center items-center">
                    <Tab title="Entrar" />
                    <Tab title="Cadastro" />
                </TabList>
                <TabPanels className="h-full flex flex-col flex-1">
                    <TabPanel className="flex-1 flex flex-col">
                        <AuthForm action="/login" />
                    </TabPanel>
                    <TabPanel>
                        <AuthForm action="/register" />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>

    )
}

export default AuthTab