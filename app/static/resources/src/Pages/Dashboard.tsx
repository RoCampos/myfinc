import { Link } from '@inertiajs/react'

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href="/logout" method="post" as="button">Logout</Link>
        </div>
    )
}

export default Dashboard