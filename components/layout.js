import React from 'react';
import Router from 'next/router';
import Footer from "./footer";
import Header from "./header";
import { useAuth } from "../contexts/authContext";
import { unauthenticatedRoutes } from '../config/routes';
import Link from 'next/link';

export default function Layout({ children }) {
    const { user } = useAuth();
    const [showLayout, setShowLayout] = React.useState(false);

    React.useEffect(() => {
        if (!user && !unauthenticatedRoutes.includes(Router.pathname)) {
            Router.push({
                pathname: '/signin',
                query: {
                    forwardTo: Router.pathname
                }
            })
        } else if (user) {
            if (user.profile && user.profile.name) {
                setShowLayout(true);
                Router.push(Router.pathname)
                if (Router.query.forwardTo) {
                    Router.push(Router.query.forwardTo)
                }
            }
            // else if (user.profile && user.profile.name) {
            //     Router.push({
            //         pathname: '/completeProfile',
            //         query: {
            //             forwardTo: Router.pathname,
            //         }
            //     })
            // }
            
        }
    }, [user, showLayout]);

    return (
        <div className="flex flex-col">
            {showLayout ?
                <>
                    <Header />
                    {!user.profile.isRegistrationComplete && Router.pathname !== '/completeProfile' ?
                        <Link href='completeProfile'>
                            <div className='px-2 w-full my-2'>
                                <button className="btn btn-primary w-full">Complete Profile</button>
                            </div>
                        </Link>
                        : null}
                </> : null}
            <main className="px-2 min-h-screen container mx-auto">
                {children}
            </main>
            {showLayout ? <Footer /> : null}
        </div>
    )
}