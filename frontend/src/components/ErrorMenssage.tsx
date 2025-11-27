type ErrorMenssageProps = {
    children: React.ReactNode
}
export default function ErrorMessage({ children }: ErrorMenssageProps) {
    return (
        <div className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center">{children}</div>
    )
}