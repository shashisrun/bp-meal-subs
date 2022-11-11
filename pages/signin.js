import React from 'react';
import AskName from '../components/profile/askName';
import Title from "../components/title";
import { setUpRecaptcha, addNamedDocument, getDocument, serverTimestamp } from '../config/firebase';
import { useAuth } from '../contexts/authContext'
import signin1 from '../assets/signin_1.png'
import signin2 from '../assets/signin_2.png'
import signin3 from '../assets/signin_3.png'
import ImageViewer from '../components/imageViewer';

export default function Signin() {
    const [phone, setPhone] = React.useState('');
    const [confirmObject, setConfirmObject] = React.useState(null);
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState();
    const { user, setUser } = useAuth();

    const sendOTP = async (event) => {
        event.preventDefault();
        // setSentOtp(true)
        try {
            const reponse = await setUpRecaptcha(`+91${phone}`)
            setConfirmObject(reponse);
        } catch (error) {
            setError(error.message);
        }
    }

    const verifyOTP = async (event) => {
        event.preventDefault();
        // setSentOtp(true)
        try {
            setError(null);
            const reponse = await confirmObject.confirm(otp)
            console.log(reponse.user.phoneNumber);
            const getUser = await getDocument('users', reponse.user.uid);
            if (!getUser) {
                const responseNew = await addNamedDocument('users', {
                    phone: reponse.user.phoneNumber,
                    isRegistrationComplete: false,
                    isActive: true,
                    lastLogin: serverTimestamp(),
                    createdAt: serverTimestamp()
                }, reponse.user.uid)
                if (responseNew) {
                    const profile = await getDocument('users', user.uid);
                    setUser({ ...user, profile: profile });
                }
            } else {
                const responseNew = await addNamedDocument('users', {
                    ...getUser,
                    lastLogin: serverTimestamp()
                }, reponse.user.uid)
                if (responseNew) {
                    const profile = await getDocument('users', user.uid);
                    setUser({ ...user, profile: profile });
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className='h-screen py-2'>
                <div className="w-full carousel rounded-box">
                    <div className="carousel-item w-full">
                        <ImageViewer src={signin1} width={1288} height={1364} classname='w-full' />
                    </div>
                    <div className="carousel-item w-full">
                        <ImageViewer src={signin2} width={1288} height={1364} classname='w-full' />
                    </div>
                    <div className="carousel-item w-full">
                        <ImageViewer src={signin3} width={1288} height={1364} classname='w-full' />
                    </div>
                </div>
                <div className='bg-primary w-full h-full rounded-lg pt-5 text-white -mt-10 z-10 absolute shadow-xl'>
                    <div className='px-2'>
                        <h1 className='text-5xl font-bold font-italic'>
                            Start your Nutritionally Balanced meal plan!
                        </h1>
                    </div>
                    <div className=''>
                        {!user
                            ?
                            <div className="container mx-auto px-5 py-5">
                                <Title>
                                    Sign In!
                                </Title>
                                {!confirmObject ?
                                    <>
                                        <div className="my-2">
                                            <input type="text" placeholder="Enter your phone" className="input w-full bg-base-100 text-primary"
                                                value={phone}
                                                onChange={(event) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if ((event.target.value === '' || re.test(event.target.value)) && event.target.value.length <= 10) {
                                                        setPhone(event.target.value)
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="my-1">
                                            {error}
                                        </div>
                                        <div className="my-2">
                                            <button
                                                className="btn btn-secondary w-full"
                                                onClick={sendOTP}
                                            >Send OTP</button>
                                        </div>
                                        <div className="my-2">
                                            <div id='recaptcha-container'></div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="my-2">
                                            <input type="text" placeholder="Enter OTP" className="input w-full bg-base-100 text-primary"
                                                value={otp}
                                                onChange={(event) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if ((event.target.value === '' || re.test(event.target.value)) && event.target.value.length <= 6) {
                                                        setOtp(event.target.value)
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="my-1">
                                            {error}
                                        </div>
                                        <div className="my-2">
                                            <button
                                                className="btn btn-secondary w-full"
                                                onClick={verifyOTP}
                                            >Verify</button>
                                        </div>
                                    </>
                                }
                            </div>
                            :
                            <>
                                {!user.name
                                    ? <AskName />
                                    : <></>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}