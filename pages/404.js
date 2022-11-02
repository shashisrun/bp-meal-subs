import Link from 'next/link'
import ImageViewer from '../components/imageViewer'
import notfoundimage from '../assets/404.png'
import Title from '../components/title'
import { useRouter } from "next/router";

export default function FourOhFour() {
    const router = useRouter();
    return <>
        <div className='w-full my-5'>
            <ImageViewer src={notfoundimage} className="w-full" />
        </div>
        <Title alignment={'center'}>
            404 - Page Not Found
        </Title>
        <button
            className='btn btn-primary w-full'
            onClick={(event) => {
                event.preventDefault()
                router.back()
            }}
        >Go Back</button>
    </>
}