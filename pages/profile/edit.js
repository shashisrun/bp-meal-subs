import Title from "../../components/title";
import { useRouter } from "next/router";

export default function ProfileEdit() {
    const router = useRouter();
    return (
        <>
            <Title>
                Edit Profile!
            </Title>
            <div>
                <h2 className="my-2">
                    Currently Editing Profile is disabled, please reach out to us for any changes or query!
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