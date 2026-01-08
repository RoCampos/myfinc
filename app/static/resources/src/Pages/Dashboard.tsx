
import AppLayout from '@/Layouts/AppLayout'
import BottomNav from '@/components/BottomNav'

function Dashboard() {
    return (
        <AppLayout>
            <div className='flex flex-col flex-1 bg-finance-surface p-2 rounded border border-finance-border'>
                <BottomNav />
            </div>
        </AppLayout>
    )
}

export default Dashboard