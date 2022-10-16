import React from 'react';
import ImageViewer from '../components/imageViewer';
import { BiFoodTag } from 'react-icons/bi';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useAuth } from '../contexts/authContext';
import { addNamedDocument, createRef, getDocument, serverTimestamp } from '../config/firebase';

export default function ProductCard({ product }) {
    const { user } = useAuth();
    const [favourate, setFavoute] = React.useState(false);

    const saveFavourate = async () => {
        console.log(user);
        const getIsCurrentFavourate = await getDocument(`users/${user.uid}/favourates`, product.id);
        let data;
        if (getIsCurrentFavourate) {
            data = { ...getIsCurrentFavourate, isFavourate: !getIsCurrentFavourate.isFavourate };
        } else {
            const productRef = createRef(`meals`, product.id);
            data = {
                isFavourate: true,
                meal: productRef,
                createdAt: serverTimestamp()
            };
        }
        console.log(data);
        const updateFavourate = await addNamedDocument(`users/${user.uid}/favourates`, data, product.id);
        if (updateFavourate) setFavoute(!favourate);
    }

    React.useEffect(() => {
        if (user && user.profile && user.profile.favourates) {
            for (let i = 0; i < user.profile.favourates.length; i++) {
                if (user.profile.favourates[i].id === product.id && user.profile.favourates[i].isFavourate) setFavoute(true);
            }
        }
    }, [user, product]);

    return (
        <>
            <div className="bg-base-200 shadow-xl my-2 flex flex-col rounded-box relative my-5">
                <div className='absolute top-2 left-2 z-10'>
                    <BiFoodTag size={32} className={`
                                    ${product.mealType === 'vegetarian' ? 'text-green-500' : ''}
                                    ${product.mealType === 'eggiterian' ? 'text-yellow-500' : ''}
                                    ${product.mealType === 'non-vegetarian' ? 'text-red-500' : ''}
                                `} />
                </div>
                <div className='absolute top-2 right-2 z-10'>
                    {favourate ?
                        <button
                            onClick={saveFavourate}
                        ><IoHeart size={32} /></button>
                        :
                        <button
                            onClick={saveFavourate}
                        ><IoHeartOutline size={32} /></button>
                    }
                </div>
                <figure className="w-full rounded-box">
                    <div className="w-full carousel rounded-box">
                        {product.thumbnails.map((thumbnail, key) => {
                            return (
                                <div className="carousel-item w-full" key={key}>
                                    <ImageViewer src={thumbnail} height={500} width={500} className='w-full rounded-box' />
                                </div>
                            )
                        })}
                    </div>
                </figure>
                <div className="px-2 my-3">
                    <h2 className="text-3xl font-bold">{product.name}</h2>
                    <p className="text-l">{product.description}</p>
                    {/* <span>$ 250</span> */}
                    {/* <div className="flex flex-row">
                                    <button className="btn btn-secondary rounded-full w-8 h-8 p-0 min-h-0">-</button>
                                    <span className="w-8 h-8 p-0 flex justify-center align-items-center text-xl font-bold">0</span>
                                    <button className="btn btn-primary rounded-full w-8 h-8 p-0 min-h-0">+</button>
                                </div> */}
                </div>
            </div>
            <div className="w-2/3 mx-auto rounded h-1 bg-secondary my-1"></div>
        </>
    )
}