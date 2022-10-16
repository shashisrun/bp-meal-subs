import React from 'react';
import { useRouter } from 'next/router';
import { auth } from "../config/firebase";
import { useAuth } from '../contexts/authContext';
import ImageViewer from '../components/imageViewer';
export default function Profile() {
    const [locaUserData, setLocalUserData] = React.useState({});
    const { user, setUser } = useAuth();
    const router = useRouter()
    React.useEffect(() => {
        if (user && user.profile) {
            setLocalUserData({...user.profile})
        }
    }, [user])
    return (
        <>
            <div className='my-2 flex flex-row items-center'>
                <div className='w-1/3 p-2'>
                    <ImageViewer src={locaUserData.profilePhoto ? locaUserData.profilePhoto : 'https://picsum.photos/500'} width={500} height={500} className='rounded-full' />
                </div>
                <div className='w-2/3'>
                    <h1 className='text-3xl font-bold'>
                        {locaUserData.name}
                    </h1>
                    <h2 className='text-xl'>
                        {locaUserData.phone}
                    </h2>
                </div>
                
            </div>
            <button
                className='btn btn-primary w-full'
                onClick={() => {
                    auth.signOut()
                    router.reload(window.location.pathname)
                }}
            >signout</button>
        </>
    )
}