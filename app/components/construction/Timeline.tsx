"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Phase = {
  phase: string
  duration: string
  progress: number
}

type Props = {
  timeline: Phase[]
}

export default function Timeline({ timeline }: Props) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Construction Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeline.map((t, i) => (
          <div key={i} className="flex justify-between items-center border-b pb-2">
            <span>{t.phase}</span>
            <span className="text-sm text-muted-foreground">{t.duration}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
