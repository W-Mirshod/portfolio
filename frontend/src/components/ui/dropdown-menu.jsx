import * as React from 'react'

const DropdownMenuContext = React.createContext()

function DropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({ asChild, children }) {
  const { setOpen } = React.useContext(DropdownMenuContext)
  return React.cloneElement(children, {
    onClick: () => setOpen((v) => !v),
  })
}

function DropdownMenuContent({ children, align = 'start', className = '' }) {
  const { open } = React.useContext(DropdownMenuContext)
  if (!open) return null
  return (
    <div className={`absolute mt-2 ${align === 'end' ? 'right-0' : ''} ${className}`}>{children}</div>
  )
}

function DropdownMenuItem({ children, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`w-full text-left ${className}`}>{children}</button>
  )
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
