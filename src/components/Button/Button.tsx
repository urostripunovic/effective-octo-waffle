import { PropsWithChildren } from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'accent' | 'success' | 'danger'
}

export function Button({ children }: PropsWithChildren<ButtonProps>) {
  /**
   * TODO: Implement the Button component.
   */

  return <>{children}</>
}
