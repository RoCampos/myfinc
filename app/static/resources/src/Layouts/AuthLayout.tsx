interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex h-screen bg-finance-bg p-2">
            {children}
        </div>
    )
}

export default AuthLayout;