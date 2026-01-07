import Card from "@/components/auth/Card";
import Button from "@/components/Button";
import AuthTab from "@/components/auth/AuthTab"

function SplitShell() {
    return (
        <div className="flex flex-col h-full w-full p-2 gap-2 border border-finance-border bg-finance-surface rounded-lg">
            <Card className="bg-finance-ink justify-center items-center">
                <h2 className="text-finance-surface text-xl/12 font-italic">Controle Financeiro</h2>
                <p className="text-finance-surface text-xs">O lugar ideal para organizar suas finanças.</p>
                <ul className="flex gap-2 p-2">
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Faturas</Button>
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Orçamentos</Button>
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Metas</Button>
                </ul>
            </Card>
            <Card className="h-full">
                <AuthTab />
            </Card>
        </div >
    )
}

export default SplitShell;