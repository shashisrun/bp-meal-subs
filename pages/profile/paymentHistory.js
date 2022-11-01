import Title from "../../components/title";
import { useRouter } from "next/router";

export default function PaymentHistory() {
    const router = useRouter();
    return (
        <>
            <Title>
                Payment History!
            </Title>
            <div>
                <h2 className="my-2">
                    Currently No Payments History Available
                </h2>
                <button
                    className='btn btn-primary w-full'
                    onClick={(event) => {
                        event.preventDefault()
                        router.back()
                    }}
                >Go Back</button>
            </div>
        </>
    )
}