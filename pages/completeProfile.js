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

export default function CompleteProfile() {
    const { user, setUser } = useAuth();
    const [showComponet, setShowComponent] = React.useState(() => <>Loading...</>)


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
            else if (!profileFields.includes('height')) setShowComponent(() => <AskHeight />)
            else if (!profileFields.includes('weight')) setShowComponent(() => <AskWeight />)
            else if (!profileFields.includes('bmi')) setShowComponent(() => <ShowBMI />)
            else if (!profileFields.includes('goal')) setShowComponent(() => <AskGoal />)
            else if (!profileFields.includes('physicalActivity')) setShowComponent(() => <AskPhysicalActivity />)
            else if (!profileFields.includes('workoutFrequency')) setShowComponent(() => <AskWorkoutFrequency />)
            else if (!profileFields.includes('activePlan')) setShowComponent(() => <Plans />)
            else if (!profileFields.includes('mealType')) setShowComponent(() => <AskMealType />)
            else if (!profileFields.includes('vegDays')) setShowComponent(() => <AskVegDays />)
            else {
                completeProfile();
                setShowComponent(() => {
                    return (
                        <>
                            Your profile registration is complete
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