export default function Title({children, alignment}) {
    return (
        <h2 className={`font-bold text-xl mb-3 mt-5 ${alignment ? 'text-'+alignment : ''}`}>
            {children}
        </h2>
    )
}