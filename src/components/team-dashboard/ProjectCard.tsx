import { Avatar, AvatarGroup, Badge, Card, Icon, IconButton, ProgressBar, Skeleton, Stack, Typography } from 'mongle-ui'
import type { CardVariant, Color } from 'mongle-ui'
import { Clock, MoreHorizontal } from 'lucide-react'

export interface ProjectCardData {
  name: string
  desc: string
  status: string
  statusColor: Color
  cardVariant: CardVariant
  members: string[]
  dueDate: string
  tasks: { done: number; total: number }
}

interface ProjectCardProps {
  isLoading?: boolean
  data?: ProjectCardData
}

export default function ProjectCard({ isLoading, data }: ProjectCardProps) {
  if (isLoading) {
    return (
      <Card variant="elevated">
        <Card.Header>
          <Stack direction="horizontal" align="center" justify="between">
            <Stack direction="horizontal" align="center" gap={2}>
              <Skeleton variant="text" className="w-36 h-5" />
              <Skeleton variant="rounded" className="w-12 h-5" />
            </Stack>
            <Skeleton variant="circular" className="w-6 h-6" />
          </Stack>
        </Card.Header>
        <Card.Content>
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-4/5 h-4 mt-1" />
          <div className="mt-3">
            <Stack direction="horizontal" justify="between" className="mb-1.5">
              <Skeleton variant="text" className="w-10 h-4" />
              <Skeleton variant="text" className="w-20 h-4" />
            </Stack>
            <Skeleton variant="rounded" className="w-full h-2" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Stack direction="horizontal" align="center" justify="between">
            <Stack direction="horizontal" gap={1}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="circular" className="w-6 h-6" />
              ))}
            </Stack>
            <Skeleton variant="text" className="w-20 h-4" />
          </Stack>
        </Card.Footer>
      </Card>
    )
  }

  const { name, desc, status, statusColor, cardVariant, members, dueDate, tasks } = data!

  return (
    <Card variant={cardVariant}>
      <Card.Header>
        <Stack direction="horizontal" align="center" justify="between">
          <Stack direction="horizontal" align="center" gap={2}>
            <Typography variant="subtitle1">{name}</Typography>
            <Badge color={statusColor} variant="soft" size="sm">{status}</Badge>
          </Stack>
          <IconButton icon={MoreHorizontal} variant="ghost" size="sm" />
        </Stack>
      </Card.Header>
      <Card.Content>
        <Typography variant="body2" color="secondary">{desc}</Typography>
        <div className="mt-3">
          <Stack direction="horizontal" justify="between" className="mb-1.5">
            <Typography variant="caption" color="secondary">진행률</Typography>
            <Typography variant="caption" color="secondary">
              {tasks.done} / {tasks.total} ({Math.round((tasks.done / tasks.total) * 100)}%)
            </Typography>
          </Stack>
          <ProgressBar value={(tasks.done / tasks.total) * 100} size="sm" color="primary" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Stack direction="horizontal" align="center" justify="between">
          <AvatarGroup size="sm" max={4}>
            {members.map((m) => <Avatar key={m} name={m} size="sm" />)}
          </AvatarGroup>
          <Stack direction="horizontal" align="center" gap={1}>
            <Icon icon={Clock} size="sm" color="muted" />
            <Typography variant="caption" color="secondary">{dueDate}</Typography>
          </Stack>
        </Stack>
      </Card.Footer>
    </Card>
  )
}
