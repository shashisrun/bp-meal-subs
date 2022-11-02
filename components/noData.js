import ImageViewer from '../components/imageViewer';
import Nodata from '../assets/no-data.png';
import Title from './title';
import { useRouter } from "next/router";

export default function NoData({ message }) {
    const router = useRouter();
    return (
        <div className='w-full px-2'>
            <ImageViewer src={Nodata} width={1080} height={1080} classname='w-full' />
            <Title alignment={'center'}>
                {message}
            </Title>
            <button
                className='btn btn-primary w-full'
                onClick={(event) => {
                    event.preventDefault()
                    router.back()
                }}
            >Go Back</button>
        </div>
    )
}