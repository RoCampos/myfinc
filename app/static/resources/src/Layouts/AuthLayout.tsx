interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-screen bg-finance-bg p-2 md:p-4">
            {children}
        </div>
    )
}

export default AuthLayout;