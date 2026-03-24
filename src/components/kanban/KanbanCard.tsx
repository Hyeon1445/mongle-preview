import { memo } from 'react'
import { Avatar, AvatarGroup, Badge, Card, Icon, ProgressBar, Stack, Typography } from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'
import { Calendar, GripVertical } from 'lucide-react'
import KanbanCardSkeleton from './KanbanCardSkeleton'

export interface KanbanTask {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  assignees: { name: string; color: AvatarColor }[]
  dueDate?: string
  tags: { label: string; color: Color }[]
  progress?: number
}

const PRIORITY: Record<KanbanTask['priority'], { label: string; color: Color }> = {
  high: { label: '높음', color: 'error' },
  medium: { label: '보통', color: 'warning' },
  low: { label: '낮음', color: 'info' },
}

interface KanbanCardProps {
  task?: KanbanTask
  isLoading?: boolean
  isDragging?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
}

export const KanbanCard = memo(function KanbanCard({
  task,
  isLoading,
  isDragging,
  onDragStart,
  onDragEnd,
}: KanbanCardProps) {
  if (isLoading || !task) return <KanbanCardSkeleton />

  const p = PRIORITY[task.priority]

  return (
    <Card
      variant="elevated"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`cursor-grab active:cursor-grabbing select-none transition-opacity ${isDragging ? 'opacity-25' : ''}`}
    >
      <Card.Content className="p-3">
        <Stack direction="vertical" gap={2}>
          <Stack direction="horizontal" align="center" justify="between">
            <Badge color={p.color} variant="soft" size="sm">{p.label}</Badge>
            <Icon icon={GripVertical} size="sm" color="muted" />
          </Stack>

          <Typography variant="subtitle2" className="leading-snug">{task.title}</Typography>

          <Typography variant="body2" color="secondary" className="line-clamp-2 leading-snug">
            {task.description}
          </Typography>

          {task.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} wrap>
              {task.tags.map((tag) => (
                <Badge key={tag.label} color={tag.color} variant="soft" size="sm">{tag.label}</Badge>
              ))}
            </Stack>
          )}

          {task.progress !== undefined && (
            <Stack direction="vertical" gap={1}>
              <Stack direction="horizontal" align="center" justify="between">
                <Typography variant="caption" color="secondary">진행률</Typography>
                <Typography variant="caption" color="primary">{task.progress}%</Typography>
              </Stack>
              <ProgressBar value={task.progress} size="sm" color="primary" />
            </Stack>
          )}

          <Stack direction="horizontal" align="center" justify="between">
            <AvatarGroup size="sm" max={3}>
              {task.assignees.map((a) => (
                <Avatar key={a.name} name={a.name} color={a.color} size="sm" />
              ))}
            </AvatarGroup>
            {task.dueDate && (
              <Stack direction="horizontal" gap={1} align="center">
                <Icon icon={Calendar} size="sm" color="muted" />
                <Typography variant="caption" color="secondary">{task.dueDate}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Card.Content>
    </Card>
  )
})
