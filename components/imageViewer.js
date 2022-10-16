import React from "react";
import Image from 'next/image';
import { getFile } from "../config/firebase";
export default function ImageViewer(props) {
    const { src, ...attributes } = props;
    const [url, setUrl] = React.useState();

    React.useEffect(() => {
        const getUrl = async () => {
            const file = await getFile(src);
            if (file) {
                setUrl(file);
            } else {
                setUrl(src);
            }
        }
        getUrl();
    }, [src])

    if (!url) return <progress className="progress w-56"></progress>

    return <Image src={url} {...attributes} />
}