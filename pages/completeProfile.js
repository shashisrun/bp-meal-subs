import React from 'react';
import { useAuth } from '../contexts/authContext';
import AskGender from '../components/profile/askGender';
import AskHeight from '../components/profile/askHeight';
import AskWeight from '../components/profile/askWeight';
import ShowBMI from '../components/profile/showBMI';
import AskGoal from '../components/profile/askGoal';
import AskPhysicalActivity from '../components/profile/askPhysicalActivity';
import AskWorkoutFrequency from '../components/profile/askWorkoutFrequency';
import Plans from '../components/profile/plans';
import AskMealType from '../components/profile/askMealType';
import AskVegDays from '../components/profile/askVegDays';
import { addNamedDocument, getDocument } from "../config/firebase";
import AskAge from '../components/profile/askAge';
import Title from '../components/title';
import ImageViewer from '../components/imageViewer';
import successfull from '../assets/successfulll.png';
import { useRouter } from "next/router";

export default function CompleteProfile() {
    const { user, setUser } = useAuth();
    const [showComponet, setShowComponent] = React.useState(() => {
        return (
            <>
                <div className="w-full h-full">
                    <progress class="progress w-2/3"></progress>
                </div>
            </>
        )
    })
    const router = useRouter();


    React.useEffect(() => {
        const completeProfile = async () => {
            if (!user.profile.isRegistrationComplete) {
                addNamedDocument('users', {
                    isRegistrationComplete: true
                }, user.uid).then(() => {
                    getDocument('users', user.uid).then((profile) => {
                        setUser({ ...user, profile: profile });
                        console.log(profile);
                    })
                })
            }
        }
        if (user) {
            console.log(user.profile);
            const profileFields = Object.keys(user.profile)
            console.log(profileFields)
            if (!profileFields.includes('gender')) setShowComponent(() => <AskGender />)
            else if (!profileFields.includes('age')) setShowComponent(() => <AskAge />)
            else if (!profileFields.includes('height')) setShowComponent(() => <AskHeight />)
            else if (!profileFields.includes('weight')) setShowComponent(() => <AskWeight />)
            else if (!profileFields.includes('bmi')) setShowComponent(() => <ShowBMI />)
            else if (!profileFields.includes('goal')) setShowComponent(() => <AskGoal />)
            else if (!profileFields.includes('physicalActivity')) setShowComponent(() => <AskPhysicalActivity />)
            else if (!profileFields.includes('workoutFrequency')) setShowComponent(() => <AskWorkoutFrequency />)
            else if (!profileFields.includes('mealType')) setShowComponent(() => <AskMealType />)
            else if (user.profile.mealType !== 'vegetarian' && !profileFields.includes('vegDays')) setShowComponent(() => <AskVegDays />)
            else if (!profileFields.includes('activePlan')) setShowComponent(() => <Plans />)
            else {
                completeProfile();
                setShowComponent(() => {
                    return (
                        <>
                            <ImageViewer src={successfull} width={1080} height={1080} classname='w-full' />
                            <Title alignment={'center'}>
                                Your profile registration is complete
                            </Title>
                            <button
                                className='btn btn-primary w-full'
                                onClick={(event) => {
                                    event.preventDefault()
                                    router.push('/')
                                }}
                            >Go to home</button>
                        </>
                    )
                })
            }
        }
    }, [user]);
    
    return (
        <>
            {showComponet}
        </>
    )
}