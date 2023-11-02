"use client"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            type={type}
            disabled={disabled}
            ref={ref}
            className={twMerge(
                `rounded-full bg-green-500 border border-transparent p-3 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50 transition hover:opacity-75`,
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button