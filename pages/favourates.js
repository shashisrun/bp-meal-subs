import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { where, documentId } from '../config/firebase';
import { useAuth } from '../contexts/authContext';
import { getDocuments } from '../config/firebase';
import ProductList from '../components/productList'

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
        <div>
            <ProductList meals={meals} />
        </div>
    )
}
