import Link from "next/link";
import ImageViewer from "./imageViewer";

export default function Offers() {
    const offers = [
        {
            src: 'offers/starter_package.jpeg',
            alt: 'Starter Package',
            link: '/completeProfile'
        },
        {
            src: 'offers/monthly_package.jpeg',
            alt: 'Monthly Package',
            link: '/completeProfile'
        },
        {
            src: 'offers/transformation_package.jpeg',
            alt: 'Tranformation Package',
            link: '/completeProfile'
        }
    ]
    return (
        <div className="w-full carousel rounded-box">
            {offers.map((offer, key) => {
                return (
                    <div className="carousel-item w-2/3 px-1" key={key}>
                        <Link href={offer.link}>
                            <ImageViewer src={offer.src} className="w-full rounded-box" alt={offer.alt} width={1080} height={1080} />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}