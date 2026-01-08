
interface AppLayoutProps {
    children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-finance-bg p-2 rounded border border-finance-border">
            {children}
        </div>
    )
}

export default AppLayout;
