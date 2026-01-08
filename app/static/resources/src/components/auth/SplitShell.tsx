import Card from "@/components/auth/Card";
import Button from "@/components/Button";
import AuthTab from "@/components/auth/AuthTab"

function SplitShell() {
    return (
        <div className="flex flex-1 flex-col w-full p-2 sm:max-lg:p-4 lg:h-screen gap-2 border border-finance-border bg-finance-surface rounded-lg landscape:flex-row" >
            <Card className="bg-finance-ink justify-center items-center landscape:flex-1/3 landscape:justify-center landscape:items-center portrait:flex-0">
                <h2 className="text-finance-surface text-xl/12 font-italic sm:max-md:text-center sm:max-md:text-xl/6">Controle Financeiro</h2>
                <p className="text-finance-surface text-xs sm:max-md:text-center">O lugar ideal para organizar suas finanças.</p>
                <ul className="flex gap-2 p-2 landscape:flex-col">
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Faturas</Button>
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Orçamentos</Button>
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Metas</Button>
                </ul>
            </Card>
            <Card className="sm:max-lg:h-2/3 landscape:flex-2/3">
                <AuthTab />
            </Card>
        </div >
    )
}

export default SplitShell;