
import { Tab as TabHeadless, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import AuthForm from "@/components/auth/AuthForm"


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

    return (
        <div className="flex flex-col gap-4 justify-center flex-1">

            <TabGroup className="flex flex-col gap-4">
                <TabList className="flex self-center border border-finance-border rounded-xl w-auto justify-center items-center">
                    <Tab title="Entrar" />
                    <Tab title="Cadastro" />
                </TabList>
                <TabPanels className="flex flex-col flex-1">
                    <TabPanel className="flex-1 flex flex-col">
                        <AuthForm action="/login" />
                    </TabPanel>
                    <TabPanel className="flex-1 flex flex-col">
                        <AuthForm action="/register" />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>

    )
}

export default AuthTab