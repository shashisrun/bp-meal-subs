import Link from "next/link";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ImageViewer from "./imageViewer";

export default function Offers() {
    const [current, setCurrent] = React.useState(0)
    const offers = [
        {
            src: 'offers/starter_package.png',
            alt: 'Starter Package',
            link: '/completeProfile'
        },
        {
            src: 'offers/monthly_package.png',
            alt: 'Monthly Package',
            link: '/completeProfile'
        },
        {
            src: 'offers/transformation_package.png',
            alt: 'Tranformation Package',
            link: '/completeProfile'
        }
    ]

    const incrementScroll = () => {
        if (current < offers.length) {
            setCurrent(current + 1)
        } else {
            setCurrent(0)
        }
    }

    React.useEffect(() => {
        const offerdiv = document.getElementById('offers-' + current);
        if (offerdiv) offerdiv.scrollIntoView();
        setTimeout(() => {
            incrementScroll();
        }, 2000)
    }, [current])



    return (
        <div className="w-full carousel rounded-box">
            <Carousel autoPlay={true} infiniteLoop={true}>
                {offers.map((offer, key) => {
                    return (
                        <div key={key}>
                            <Link href={offer.link}>
                                <ImageViewer src={offer.src} className="w-full rounded-box" alt={offer.alt} width={1080} height={1080} />
                            </Link>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}