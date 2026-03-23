import { Badge, Card, Icon, Skeleton, Stack, Typography } from 'mongle-ui'
import type { Color } from 'mongle-ui'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  isLoading?: boolean
  label?: string
  value?: string
  icon?: LucideIcon
  badge?: { label: string; color: Color }
}

export default function StatCard({ isLoading, label, value, icon, badge }: StatCardProps) {
  if (isLoading) {
    return (
      <Card variant="elevated">
        <Card.Header>
          <Stack direction="horizontal" align="center" justify="between">
            <Skeleton variant="text" className="w-20 h-4" />
            <Skeleton variant="circular" className="w-4 h-4" />
          </Stack>
        </Card.Header>
        <Card.Content>
          <Skeleton variant="text" className="w-12 h-9" />
        </Card.Content>
        <Card.Footer>
          <Skeleton variant="rounded" className="w-24 h-5" />
        </Card.Footer>
      </Card>
    )
  }

  return (
    <Card variant="elevated">
      <Card.Header>
        <Stack direction="horizontal" align="center" justify="between">
          <Typography variant="overline" color="secondary">{label}</Typography>
          <Icon icon={icon!} size="sm" color="muted" />
        </Stack>
      </Card.Header>
      <Card.Content>
        <Typography variant="heading1">{value}</Typography>
      </Card.Content>
      <Card.Footer>
        <Badge color={badge!.color} variant="soft" size="sm">{badge!.label}</Badge>
      </Card.Footer>
    </Card>
  )
}
