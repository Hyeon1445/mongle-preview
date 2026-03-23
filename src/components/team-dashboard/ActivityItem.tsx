import { Avatar, Badge, Divider, Icon, Skeleton, Stack, Typography } from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'
import type { LucideIcon } from 'lucide-react'

export interface ActivityItemData {
  user: string
  action: string
  icon: LucideIcon
  tag: string
  tagColor: Color
  time: string
  avatarColor: AvatarColor
}

interface ActivityItemProps {
  isLoading?: boolean
  data?: ActivityItemData
  last?: boolean
}

export default function ActivityItem({ isLoading, data, last }: ActivityItemProps) {
  return (
    <div>
      {isLoading ? (
        <Stack direction="horizontal" align="center" gap={3} className="py-3">
          <Skeleton variant="circular" className="w-7 h-7" />
          <Stack direction="horizontal" gap={2} align="center" className="flex-1">
            <Skeleton variant="circular" className="w-4 h-4" />
            <Skeleton variant="text" className="flex-1 h-4" />
            <Skeleton variant="rounded" className="w-10 h-5" />
          </Stack>
          <Skeleton variant="text" className="w-14 h-4" />
        </Stack>
      ) : (
        <Stack direction="horizontal" align="center" gap={3} className="py-3">
          <Avatar name={data!.user} color={data!.avatarColor} size="sm" />
          <Stack direction="horizontal" gap={2} align="center" className="flex-1 min-w-0">
            <Icon icon={data!.icon} size="sm" color="muted" />
            <Typography variant="body2" ellipsis className="flex-1">{data!.action}</Typography>
            <Badge color={data!.tagColor} variant="soft" size="sm">{data!.tag}</Badge>
          </Stack>
          <Typography variant="caption" color="secondary" className="whitespace-nowrap">{data!.time}</Typography>
        </Stack>
      )}
      {!last && <Divider color="light" />}
    </div>
  )
}
