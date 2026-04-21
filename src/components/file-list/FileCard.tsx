import { Avatar, AvatarGroup, Badge, Card, Icon, IconButton, Skeleton, Stack, Typography } from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'
import { File, FileText, Image, MoreHorizontal, Presentation, Star, Table2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface FileData {
  id: string
  name: string
  type: '문서' | '시트' | '발표' | '이미지' | '기타'
  modifiedAt: string
  size: string
  starred: boolean
  collaborators: { name: string; color: AvatarColor }[]
}

const TYPE_CONFIG: Record<FileData['type'], { icon: LucideIcon; color: Color; bg: string }> = {
  문서: { icon: FileText, color: 'info', bg: 'bg-blue-50' },
  시트: { icon: Table2, color: 'success', bg: 'bg-green-50' },
  발표: { icon: Presentation, color: 'warning', bg: 'bg-amber-50' },
  이미지: { icon: Image, color: 'secondary', bg: 'bg-purple-50' },
  기타: { icon: File, color: 'neutral', bg: 'bg-gray-50' },
}

interface FileCardProps {
  data?: FileData
  isLoading?: boolean
  view?: 'grid' | 'list'
}

export default function FileCard({ data, isLoading, view = 'grid' }: FileCardProps) {
  if (view === 'list') {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
        {isLoading ? (
          <>
            <Skeleton variant="rounded" className="w-9 h-9 shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton variant="text" className="w-48 h-4 mb-1" />
              <Skeleton variant="text" className="w-24 h-3" />
            </div>
            <Skeleton variant="rounded" className="w-12 h-5 hidden sm:block" />
            <Skeleton variant="rounded" className="w-16 h-6 hidden md:block" />
            <Skeleton variant="rounded" className="w-8 h-8" />
          </>
        ) : data ? (
          <>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${TYPE_CONFIG[data.type].bg}`}>
              <Icon icon={TYPE_CONFIG[data.type].icon} size="sm" color={TYPE_CONFIG[data.type].color} />
            </div>
            <div className="flex-1 min-w-0">
              <Typography variant="body2" className="truncate">{data.name}</Typography>
              <Typography variant="caption" color="secondary">{data.modifiedAt} · {data.size}</Typography>
            </div>
            <Badge color={TYPE_CONFIG[data.type].color} variant="soft" size="sm" className="hidden sm:inline-flex shrink-0">
              {data.type}
            </Badge>
            <AvatarGroup size="sm" max={3} className="hidden md:flex shrink-0">
              {data.collaborators.map((c) => (
                <Avatar key={c.name} name={c.name} color={c.color} size="sm" />
              ))}
            </AvatarGroup>
            <Icon
              icon={Star}
              size="sm"
              className={`shrink-0 ${data.starred ? 'text-amber-400 fill-amber-400' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}
            />
            <IconButton icon={MoreHorizontal} variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 shrink-0" />
          </>
        ) : null}
      </div>
    )
  }

  return (
    <Card variant="outlined" className="hover:shadow-md transition-shadow cursor-pointer group">
      <Card.Content className="p-4">
        {isLoading ? (
          <Stack direction="vertical" gap={3}>
            <Skeleton variant="rounded" className="w-10 h-10" />
            <div>
              <Skeleton variant="text" className="w-full h-4 mb-1.5" />
              <Skeleton variant="text" className="w-2/3 h-3" />
            </div>
            <Stack direction="horizontal" justify="between" align="center">
              <Skeleton variant="rounded" className="w-12 h-5" />
              <Skeleton variant="rounded" className="w-14 h-6" />
            </Stack>
          </Stack>
        ) : data ? (
          <Stack direction="vertical" gap={3}>
            <Stack direction="horizontal" justify="between" align="start">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${TYPE_CONFIG[data.type].bg}`}>
                <Icon icon={TYPE_CONFIG[data.type].icon} size="md" color={TYPE_CONFIG[data.type].color} />
              </div>
              <Stack direction="horizontal" align="center" gap={1}>
                <Icon
                  icon={Star}
                  size="sm"
                  className={`${data.starred ? 'text-amber-400 fill-amber-400' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}
                />
                <IconButton icon={MoreHorizontal} variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" />
              </Stack>
            </Stack>
            <div>
              <Typography variant="subtitle2" className="truncate">{data.name}</Typography>
              <Typography variant="caption" color="secondary">{data.modifiedAt} · {data.size}</Typography>
            </div>
            <Stack direction="horizontal" justify="between" align="center">
              <Badge color={TYPE_CONFIG[data.type].color} variant="soft" size="sm">{data.type}</Badge>
              <AvatarGroup size="sm" max={3}>
                {data.collaborators.map((c) => (
                  <Avatar key={c.name} name={c.name} color={c.color} size="sm" />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>
        ) : null}
      </Card.Content>
    </Card>
  )
}
