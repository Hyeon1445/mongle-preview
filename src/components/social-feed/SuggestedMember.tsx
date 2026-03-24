import { useState } from 'react'
import { Avatar, Badge, Button, Skeleton, Stack, Typography } from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'

export interface SuggestedMemberData {
  name: string
  role: string
  roleColor: Color
  avatarColor: AvatarColor
  mutualCount: number
}

interface SuggestedMemberProps {
  isLoading?: boolean
  data?: SuggestedMemberData
}

export default function SuggestedMember({ isLoading, data }: SuggestedMemberProps) {
  const [following, setFollowing] = useState(false)

  if (isLoading) {
    return (
      <Stack direction="horizontal" align="center" gap={3} className="py-2">
        <Skeleton variant="circular" className="w-9 h-9 shrink-0" />
        <Stack direction="vertical" gap={1} className="flex-1">
          <Skeleton variant="text" className="w-24 h-4" />
          <Skeleton variant="text" className="w-16 h-3" />
        </Stack>
        <Skeleton variant="rounded" className="w-16 h-7" />
      </Stack>
    )
  }

  return (
    <Stack direction="horizontal" align="center" gap={3} className="py-2">
      <Avatar name={data!.name} color={data!.avatarColor} size="md" />
      <Stack direction="vertical" gap={1} className="flex-1 min-w-0">
        <Stack direction="horizontal" gap={2} align="center">
          <Typography variant="subtitle2" ellipsis>{data!.name}</Typography>
          <Badge color={data!.roleColor} variant="soft" size="sm">{data!.role}</Badge>
        </Stack>
        <Typography variant="caption" color="disabled">
          공통 팀원 {data!.mutualCount}명
        </Typography>
      </Stack>
      <Button
        variant={following ? 'outline' : 'soft'}
        color={following ? 'neutral' : 'primary'}
        size="sm"
        onClick={() => setFollowing((v) => !v)}
      >
        {following ? '팔로잉' : '팔로우'}
      </Button>
    </Stack>
  )
}
