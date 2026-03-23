import { Avatar, Badge, Divider, IconButton, Skeleton, Stack, Typography } from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'
import { MessageSquare } from 'lucide-react'

export interface TeamMemberData {
  name: string
  role: string
  status: string
  statusColor: Color
  avatarColor: AvatarColor
}

interface TeamMemberRowProps {
  isLoading?: boolean
  data?: TeamMemberData
  last?: boolean
}

export default function TeamMemberRow({ isLoading, data, last }: TeamMemberRowProps) {
  return (
    <div>
      {isLoading ? (
        <Stack direction="horizontal" align="center" gap={3} className="py-2">
          <Skeleton variant="circular" className="w-9 h-9" />
          <Stack direction="vertical" gap={1} className="flex-1">
            <Skeleton variant="text" className="w-24 h-4" />
            <Skeleton variant="rounded" className="w-16 h-4" />
          </Stack>
          <Skeleton variant="circular" className="w-7 h-7" />
        </Stack>
      ) : (
        <Stack direction="horizontal" align="center" gap={3} className="py-2">
          <Avatar name={data!.name} color={data!.avatarColor} size="md" />
          <Stack direction="vertical" gap={0} className="flex-1 min-w-0">
            <Typography variant="subtitle2" ellipsis>{data!.name}</Typography>
            <Stack direction="horizontal" gap={1} align="center">
              <Badge color={data!.statusColor} variant="soft" size="sm">{data!.status}</Badge>
              <Typography variant="caption" color="disabled">{data!.role}</Typography>
            </Stack>
          </Stack>
          <IconButton icon={MessageSquare} variant="ghost" size="sm" />
        </Stack>
      )}
      {!last && <Divider color="light" />}
    </div>
  )
}
