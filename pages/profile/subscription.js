import React from "react";
import Title from "../../components/title";
import { useAuth } from '../../contexts/authContext';
import { useRouter } from "next/router";
import moment from "moment";
import { getDocument, updateDocument } from "../../config/firebase";

export default function Subscription() {
    const [ending, setEnding] = React.useState();
    const { user, setUser } = useAuth();
    const router = useRouter()
    React.useEffect(() => {
        if (user && user.profile && user.profile.activePlan) {
            const today = new Date();
            console.log(today.getDate() - user.profile.activePlan.createdAt.toDate().setDate(user.profile.activePlan.createdAt.toDate().getDate() + user.profile.activePlan.duration))
        }
    }, [user])
    return (
        <>
            <Title>
                Manage Subscription!
            </Title>
            {user && user.profile && user.profile.activePlan ?
                <>
                    <div>
                        <h2 className="my-2 text-xl">
                            Plan: {user.profile.activePlan.name}
                        </h2>
                        <h2 className="my-2 text-xl">
                            Started: {moment(user.profile.activePlan.createdAt.toDate()).fromNow()}
                        </h2>
                        <h2 className="my-2 text-xl">
                            Remaining Meal Counts: {user.profile.mealCounts}
                        </h2>
                        <h2 className="my-2 text-xl">
                            Order ID: {user.profile.activePlan.orderId}
                        </h2>
                        <h2 className="my-2 text-xl">
                            Status: {user.profile.activePlan.status ? 'Active' : 'Paused'}
                        </h2>
                        <button
                            className='btn btn-primary w-full'
                            onClick={(event) => {
                                event.preventDefault()

                                updateDocument(`users`, {
                                    activePlan: {
                                        status: !user.profile.activePlan.status
                                    }
                                }, user.uid).then(() => {
                                    getDocument(`users`, user.uid).then((data) => {
                                        setUser({...user, profile: data});
                                    })
                                })
                                
                            }}
                        >{user.profile.activePlan.status ? 'Pause Subscription' : 'Activate Subscription'}</button>
                    </div>
                    <p className="my-2 font-bold">
                        To change plan please contact admin.
                    </p>
                </>
            :<></>}
        </>
    )
}