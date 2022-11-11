import React from "react";
import Title from "../../components/title";
import { getDocuments, updateDocument } from "../../config/firebase";
import { useAuth } from "../../contexts/authContext";

export default function DeliverySlot() {
    const [slot, setSlot] = React.useState()
    const [slots, setSlots] = React.useState([])
    const { user } = useAuth();
    
    React.useEffect(() => {
        getDocuments('slots').then((data) => setSlots(data));
    }, []);

    const setDeliverySlot = () => {
        updateDocument('users', {
            deliverySlot: slot
        }, user.uid).then(() => console.log(slot))
    }

    return (
        <>
            <Title>
                Your Delivery Slot
            </Title>
            <div className="container mx-auto">
                {slots.map((localSlot, index) => {
                    return (
                        <>
                            <div className="form-control" key={index}>
                                <label className="label cursor-pointer">
                                    <span className="label-text text-xl font-bold">{localSlot.time}</span>
                                    <input type="radio" name="slot" className="radio checked:bg-primary radio-primary" checked={user.profile.deliverySlot === localSlot.time || slot === localSlot.time ? true : false} onClick={() => { setSlot(localSlot.time); console.log(localSlot.time)}} />
                                </label>
                            </div>
                            <div className="divider"></div>
                        </>
                    )
                })}
            </div>
            <div className='my-5'>
                <button className="btn btn-primary w-full" onClick={() => {setDeliverySlot()}}>
                    Set Delivery Slot
                </button>
            </div>
        </>
    )
}