import {
    ButtonHTMLAttributes,
    CSSProperties,
    PropsWithChildren,
    forwardRef,
} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "accent" | "success" | "danger";
}

const colorVariants = {
    primary: "--primary-color",
    accent: "--accent-color",
    success: "--success-color",
    danger: "--danger-color",
};

export const Button = forwardRef<
    HTMLButtonElement,
    PropsWithChildren<ButtonProps>
>(({ children, variant = "primary", ...props }, ref) => {
    const buttonStyle: CSSProperties = {
        backgroundColor: `var(${colorVariants[variant]})`,
        cursor: "pointer",
        color: "white",
    };

    return (
        <button ref={ref} {...props} style={buttonStyle}>
            {children}
        </button>
    );
});
