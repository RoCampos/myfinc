interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex h-screen bg-finance-bg xl:py-20 xl:px-96 lg:py-20 lg:px-24 md:py-20 md:px-12">
            {children}
        </div>
    )
}

export default AuthLayout;