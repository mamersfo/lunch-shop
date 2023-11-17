import Link from 'next/link'

const Header = ({
    title,
    href,
    children,
}: {
    title: string
    href: string
    children: React.ReactNode
}) => {
    return (
        <div className='flex flex-row justify-between'>
            <Link href={href} className='text-xl font-semibold'>
                {title}
            </Link>
            <div className='flex flex-row gap-4 h-10'>{children}</div>
        </div>
    )
}

export default Header
