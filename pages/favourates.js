import React from 'react';
import { where, documentId } from '../config/firebase';
import { useAuth } from '../contexts/authContext';
import { getDocuments } from '../config/firebase';
import ProductList from '../components/productList'
import NoData from '../components/noData';

export default function Favourates() {
    const [meals, setMeals] = React.useState([]);
    const { user, setUser } = useAuth();
    React.useEffect(() => {
        if (user) {
            const whereFavQuery = where("isFavourate", "==", true)
            getDocuments(`users/${user.uid}/favourates`, whereFavQuery).then((data) => {
                const mealQueryArray = [];
                for (let i = 0; i < data.length; i++) {
                    mealQueryArray.push(data[i].id);
                }
                if (mealQueryArray.length) {
                    const mealFavQuery = where(documentId(), "in", mealQueryArray)
                    getDocuments('meals', mealFavQuery).then((data) => {
                        setMeals(data);
                    });
                }
            });
        }
    }, [user])
    return (
        <>
            {
                meals.length ?
                    <div>
                        <ProductList meals={meals} />
                    </div>
                    :
                    <>
                        <NoData message={'You have liked any meals yet!'} />
                    </>
            }
        </>
    )
}
