import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

export interface ContentSectionProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

export default function ContentSection({ title, description, children, className }: ContentSectionProps) {
  return (
    <section className={["w-full px-4", className].filter(Boolean).join(" ")}> 
      <Card className="forbidden-glass">
        <CardContent className="p-6 md:p-8">
          <h2 className="font-playfair forbidden-text text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="font-inter text-gray-300 mt-3 md:mt-4 leading-relaxed">
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </CardContent>
      </Card>
    </section>
  )
}


