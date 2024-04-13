type ButtonProps = {
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...rest }: ButtonProps) {
    return <button {...rest} className="py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400">{children}</button>
}