import React from 'react';
import { getDocuments, where } from '../config/firebase';
import ProductCard from './productCard';
import CategoryCarousel from './categoryCarousel';
import { useAuth } from '../contexts/authContext';
import Title from './title';

export default function ProductList({ meals }) {
    const [filteredMeals, setFilteredMeals] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [title, setTitle] = React.useState("All Meals");
    const { user, setUser } = useAuth();

    React.useEffect(() => {
        if (user && user.profile) {
            const whereFavQuery = where("isFavourate", "==", true)
            getDocuments(`users/${user.uid}/favourates`, whereFavQuery).then((data) => {
                const profile = { ...user.profile, favourates: data ? data : [] };
                const updatedUser = { ...user, profile: profile };
                setUser(updatedUser);
            });
        }
    }, [])

    return (
        <div className='my-5'>
            <CategoryCarousel onClick={(data) => {
                if (data) {
                    const mealsCopy = [ ...meals ];
                    const localFilteredMeals = mealsCopy.filter(meal => {
                        for (let i = 0; i < meal.cuisines.length; i++) {
                            if(meal.cuisines[i].id == data.id) return meal;
                        }
                    })
                    setTitle(data.name);
                    setFilteredMeals(localFilteredMeals);
                } else {
                    setTitle('All Meals');
                    setFilteredMeals([])
                }
            }} />
            
            <Title>
                {title}
            </Title>
            
            {filteredMeals.length ?
                <>
                    {filteredMeals.map((meal, key) => {
                        return (
                            <ProductCard product={meal} key={key} />
                        )
                    })}
                </>
            :
                <>
                    {meals.map((meal, key) => {
                        return (
                            <ProductCard product={meal} key={key} />
                        )
                    })}
                </>    
        }
        </div>
    )
}