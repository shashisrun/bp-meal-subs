import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { IoHomeOutline, IoHome, IoHeartOutline, IoCartOutline, IoReaderOutline, IoPersonCircleOutline, IoHeart, IoCart, IoReader, IoPersonCircle } from 'react-icons/io5'

export default function Footer() {
    const [stick, setStick] = React.useState(true)
    const router = useRouter()
    const links = [
        {
            title: 'Home',
            url: '/',
            icon: <IoHomeOutline size={28} />,
            activeicon: <IoHome size={28} />
        },
        {
            title: 'Favourates',
            url: '/favourates',
            icon: <IoHeartOutline size={28} />,
            activeicon: <IoHeart size={28} />
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: <IoPersonCircleOutline size={28} />,
            activeicon: <IoPersonCircle size={28} />
        },
    ]

    React.useEffect(() => {
        if (window.innerWidth < 400) {
            setStick(false)
        } else {
            setStick(true)
        }
    }, [])
    
    window.addEventListener('resize', () => {
        if (window.innerWidth < 400) {
            setStick(false)
        } else {
            setStick(true)
        }
    })
    return (
        <>
            <div className='h-20'></div>
            <footer className={`${stick ? 'fixed bottom-0' : ''} w-full bg-primary rounded-t-3xl flex-none h-30 z-50`}>
                <nav className='text-center'>
                    <ul className='px-2 py-1 flex flex-row'>
                        {links.map((link, key) => {
                            return (
                                <li key={key} className={`w-1/3 ${router.pathname === link.url ? 'text-secondary font-bold' : 'text-primary-content'}`}>
                                    <Link href={link.url}>
                                        <a className='grid justify-items-center px-2 py-3 '>
                                            {router.pathname === link.url ? link.activeicon : link.icon}
                                            <h2>{link.title}</h2>
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul> 
                </nav>
            </footer>
        </>
    )
}