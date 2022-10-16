export default function CategoryCard() {
    return (
        <div className="w-full rounded-box overflow-hidden my-3 relative">
            <img className="w-full" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/wtjwh915fnytypbywvcs" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black">
                <div className="h-full w-full relative">
                    <div className="absolute bottom-0 left-0 w-full">
                        <h2 className="text-xl font-bold my-5 mx-3 text-white">
                            Roll Over! Roll Over! Roll Over! Roll Over!
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}