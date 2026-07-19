import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const alertVariants = cva(
  "relative w-full rounded-lg border border-gray-200 px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-950",
        destructive:
          "border-red-500/50 text-red-700 dark:border-red-500 dark:text-red-900",
        success:
          "border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-900",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 dark:text-yellow-900",
        gold:
          "border-gold/50 text-gold-dark dark:border-gold dark:text-gold-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  )
}

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
}

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
