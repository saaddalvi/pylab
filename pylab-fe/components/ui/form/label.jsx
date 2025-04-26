import React from "react"

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      className={`text-sm font-medium text-indigo-200 mb-2 block ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
})
Label.displayName = "Label"

export { Label }