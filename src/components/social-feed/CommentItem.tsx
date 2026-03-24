import { Avatar, Divider, Skeleton, Stack, Typography } from 'mongle-ui'
import type { AvatarColor } from 'mongle-ui'

export interface CommentItemData {
  user: string
  avatarColor: AvatarColor
  text: string
  time: string
}

interface CommentItemProps {
  isLoading?: boolean
  data?: CommentItemData
  last?: boolean
}

export default function CommentItem({ isLoading, data, last }: CommentItemProps) {
  return (
    <div>
      {isLoading ? (
        <Stack direction="horizontal" align="start" gap={2} className="py-2.5">
          <Skeleton variant="circular" className="w-7 h-7 shrink-0" />
          <Stack direction="vertical" gap={1} className="flex-1">
            <Stack direction="horizontal" gap={2} align="center">
              <Skeleton variant="text" className="w-20 h-3.5" />
              <Skeleton variant="text" className="w-12 h-3" />
            </Stack>
            <Skeleton variant="text" className="w-full h-3.5" />
            <Skeleton variant="text" className="w-3/4 h-3.5" />
          </Stack>
        </Stack>
      ) : (
        <Stack direction="horizontal" align="start" gap={2} className="py-2.5">
          <Avatar name={data!.user} color={data!.avatarColor} size="sm" />
          <Stack direction="vertical" gap={0.5} className="flex-1 min-w-0">
            <Stack direction="horizontal" gap={2} align="center">
              <Typography variant="subtitle2">{data!.user.split(' ')[0]}</Typography>
              <Typography variant="caption" color="disabled">{data!.time}</Typography>
            </Stack>
            <Typography variant="body2" color="secondary">{data!.text}</Typography>
          </Stack>
        </Stack>
      )}
      {!last && <Divider color="light" />}
    </div>
  )
}
