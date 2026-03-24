import { Badge, Skeleton, Stack, Typography } from 'mongle-ui'
import { TrendingUp } from 'lucide-react'

export interface TrendingTagData {
  tag: string
  count: number
  rising: boolean
}

interface TrendingTagProps {
  isLoading?: boolean
  data?: TrendingTagData
}

export default function TrendingTag({ isLoading, data }: TrendingTagProps) {
  if (isLoading) {
    return (
      <Stack direction="horizontal" align="center" justify="between" className="py-2 px-3">
        <Stack direction="vertical" gap={1}>
          <Skeleton variant="text" className="w-24 h-4" />
          <Skeleton variant="text" className="w-16 h-3" />
        </Stack>
        <Skeleton variant="rounded" className="w-10 h-5" />
      </Stack>
    )
  }

  return (
    <button className="w-full text-left rounded-lg py-2 px-3 hover:bg-primary-50 transition-colors group cursor-pointer">
      <Stack direction="horizontal" align="center" justify="between">
        <Stack direction="vertical" gap={0.5}>
          <Typography variant="subtitle2" className="group-hover:text-primary-600 transition-colors">
            #{data!.tag}
          </Typography>
          <Typography variant="caption" color="disabled">
            게시글 {data!.count.toLocaleString()}개
          </Typography>
        </Stack>
        {data!.rising && (
          <Badge color="success" variant="soft" size="sm">
            <TrendingUp size={10} className="inline mr-0.5" />
            급상승
          </Badge>
        )}
      </Stack>
    </button>
  )
}
