import Title from "../../components/title";
import { useRouter } from "next/router";
import NoData from "../../components/noData";

export default function PaymentHistory() {
    const router = useRouter();
    return (
        <>
            <div>
                <NoData message={'Currently No Payments History Available'} />
            </div>
        </>
    )
}