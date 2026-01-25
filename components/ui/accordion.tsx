"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-[#F2F2F214] last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  
  React.useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    
    const observer = new MutationObserver(() => {
      const state = trigger.getAttribute('data-state')
      setIsOpen(state === 'open')
    })
    
    observer.observe(trigger, {
      attributes: true,
      attributeFilter: ['data-state']
    })
    
    // Initial state
    const state = trigger.getAttribute('data-state')
    setIsOpen(state === 'open')
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={triggerRef}
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 pt-4 pb-2 px-4 text-[#F2F2F2] text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 border-b border-[#F2F2F214] data-[state=open]:border-b-0",
          className
        )}
        {...props}
      >
        {children}
        {!isOpen && (
          <Plus className="text-white pointer-events-none size-6 shrink-0 transition-opacity duration-200" />
        )}
        {isOpen && (
          <X className="text-[#F2F2F266] pointer-events-none size-6 shrink-0 transition-opacity duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="text-[#F2F2F266] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4 px-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
