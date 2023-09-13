import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//Utility function merge tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const buttonVariants = cva("button", {
    variants: {
        variant: {
            primary:
                "bg-[--primary-color] text-white border-transparent hover:opacity-75",
            accent: "bg-accent text-white border-transparent hover:opacity-75",
            success:
                "bg-[--success-color] text-white border-transparent hover:opacity-75",
            danger: "bg-[--danger-color] text-white border-transparent hover:opacity-75",
        },
        size: {
            default: "h-10 py-2 px-4",
            sm: "h-9 px-2 rounded-md",
            lg: "h-11 px-8 rounded-md",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export type Variant = "primary" | "accent" | "success" | "danger";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

/**
 * Button component is used to render a button element with pre-defined styles and can be customized with additional CSS classes.
 *
 * @component
 * @param {string} className - Additional CSS classes, including classic and Tailwind CSS classes, can be added for the button.
 * @param {Variant} variant - The button's visual style variants. Should be one of: "primary", "accent", "success", "danger".
 * @param {string} size - The button's size variants.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to the button element.
 * @returns {JSX.Element} - The rendered Button component.
 */
export const Button = forwardRef<
    HTMLButtonElement,
    PropsWithChildren<ButtonProps>
>(({ className, variant, size, ...props }, ref) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
