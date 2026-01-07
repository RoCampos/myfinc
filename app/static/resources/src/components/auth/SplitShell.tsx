import Card from "@/components/auth/Card";
import Button from "@/components/Button";
import AuthTab from "@/components/auth/AuthTab"

function SplitShell() {
    return (
        <div className="flex h-full border border-finance-border xl:w-full lg:w-auto md:w-auto rounded-lg p-6 gap-6 bg-finance-surface">
            <Card className="bg-finance-ink justify-center items-center">
                <h2 className="text-finance-surface text-3xl font-italic">Controle Financeiro</h2>
                <p className="text-finance-surface">O lugar ideal para organizar suas finanças.</p>
                <ul className="flex gap-2 p-2">
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Faturas</Button>
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Orçamentos</Button>
                    <Button className="bg-finance-slate text-finance-surface hover:bg-finance-slate/80">Metas</Button>
                </ul>
            </Card>
            <Card>
                <AuthTab />
            </Card>
        </div >
    )
}

export default SplitShell;