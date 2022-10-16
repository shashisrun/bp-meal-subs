import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Offers from '../components/offers'
import ProductList from '../components/productList'
import { getDocuments } from '../config/firebase';

export default function Home() {
  const [meals, setMeals] = React.useState([]);
  React.useEffect(() => {
    getDocuments('meals').then((data) => {
      setMeals(data);
    });
  }, [])
  return (
    <>
      <Offers />
      <ProductList meals={meals} />
    </>
  )
}
