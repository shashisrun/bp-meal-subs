import React from 'react';
import Title from "../components/title";
import { setUpRecaptcha } from '../config/firebase';

export default function Signin() {
    const [phone, setPhone] = React.useState('');
    const [confirmObject, setConfirmObject] = React.useState(null);
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState();

    const sendOTOP = async (event) => {
        event.preventDefault();
        // setSentOtp(true)
        try {
            const reponse = await setUpRecaptcha(`+91${phone}`)
            console.log(reponse);
            setConfirmObject(reponse);
        } catch (error) {
            setError(error.message);
        }
        console.log(confirmObject);
    }

    const verifyOTP = async (event) => {
        event.preventDefault();
        // setSentOtp(true)
        try {
            setError(null);
            const reponse = await confirmObject.confirm(otp)
            console.log(reponse);
        } catch (error) {
            setError(error.message);
        }
        console.log(confirmObject);
    }

    return (
        <div className="container mx-auto px-5 py-10">
            <Title>
                Sign In!
            </Title>
            {!confirmObject ?
                <>
                    <div className="my-2">
                        <input type="text" placeholder="Enter your phone" className="input w-full bg-secondary"
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
                            className="btn btn-primary w-full"
                            onClick={sendOTOP}
                        >Send OTP</button>
                    </div>
                    <div className="my-2">
                        <div id='recaptcha-container'></div>
                    </div>
                </>
                :
                <>
                    <div className="my-2">
                        <input type="text" placeholder="Enter OTP" className="input w-full bg-secondary"
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
                            className="btn btn-primary w-full"
                            onClick={verifyOTP}
                        >Verify</button>
                    </div>
                </>
            }
            <div id="recaptcha-container"></div>
        </div>
    )
}