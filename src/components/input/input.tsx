import { HTMLProps, forwardRef } from "react"

type InputProps = {
    label: string
    name: string
} & HTMLProps<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, name, ...rest }, ref) => {
    return (
        <div className="bg-white rounded-lg">
            <div className="relative bg-inherit">
                <input 
                    className="peer bg-transparent h-9 w-72 rounded-lg text-gray-800 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-teal-600 focus:outline-none focus:border-teal-600" 
                    name={name}
                    {...rest}
                    ref={ref}
                />
                <label 
                    htmlFor={name} 
                    className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-teal-600 peer-focus:text-sm transition-all">
                        {label}
                </label>
            </div>
        </div>
    )
})
