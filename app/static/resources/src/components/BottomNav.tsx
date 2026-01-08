
import { Link } from '@inertiajs/react'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { RiHomeOfficeFill } from 'react-icons/ri'
import { RiBankCardLine } from 'react-icons/ri'


interface NavProps {
    className?: string;
}

function BottomNav({ className }: NavProps) {

    const style = "text-2xl text-finance-surface md:text-4xl lg:text-5xl landscape:text-2xl"

    return (
        <nav className={"flex justify-center items-center bg-finance-ink border border-finance-border rounded-t-3xl p-2 absolute bottom-0 left-0 right-0 w-full" + className}>
            <ul className="flex justify-center items-center px-4 gap-8">
                <li>
                    <Link href="/dashboard">
                        <RiHomeOfficeFill className={style} />
                    </Link>
                </li>
                <li>
                    <Link href="/cards">
                        <RiBankCardLine className={style} />
                    </Link>
                </li>
                <li>
                    <Link href="/logout" method="post" as="button">
                        <RiLogoutCircleRLine className={style} />
                    </Link>
                </li>
            </ul>
        </nav >
    )
}

export default BottomNav;