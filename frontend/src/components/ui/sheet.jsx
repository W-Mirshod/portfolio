import * as React from 'react'
import { motion } from 'framer-motion'

const SheetContext = React.createContext()

function Sheet({ children }) {
  const [open, setOpen] = React.useState(false)
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({ asChild, children }) {
  const { setOpen } = React.useContext(SheetContext)
  return React.cloneElement(children, {
    onClick: () => setOpen(true),
  })
}

function SheetContent({ children, side = 'right', className = '' }) {
  const { open, setOpen } = React.useContext(SheetContext)
  if (!open) return null
  return (
    <motion.div
      initial={{ y: side === 'top' ? -100 : 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: side === 'top' ? -100 : 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className={`fixed inset-x-0 top-0 z-50 ${className}`}
    >
      <div className="absolute right-4 top-4">
        <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-2xl">×</button>
      </div>
      {children}
    </motion.div>
  )
}

export { Sheet, SheetTrigger, SheetContent }
