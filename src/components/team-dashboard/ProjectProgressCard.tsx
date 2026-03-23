import { Badge, Card, ProgressBar, Skeleton, Stack, Typography } from 'mongle-ui'
import type { ProjectCardData } from './ProjectCard'

interface ProjectProgressCardProps {
  isLoading?: boolean
  projects?: Pick<ProjectCardData, 'name' | 'status' | 'statusColor' | 'tasks'>[]
}

export default function ProjectProgressCard({ isLoading, projects }: ProjectProgressCardProps) {
  return (
    <Card variant="elevated">
      <Card.Header>
        {isLoading ? (
          <>
            <Skeleton variant="text" className="w-28 h-5" />
            <Skeleton variant="text" className="w-20 h-4 mt-1" />
          </>
        ) : (
          <>
            <Typography variant="subtitle1">프로젝트 진행률</Typography>
            <Typography variant="caption" color="secondary">전체 {projects!.length}개 프로젝트</Typography>
          </>
        )}
      </Card.Header>
      <Card.Content>
        <Stack direction="vertical" gap={4}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Stack direction="horizontal" justify="between" className="mb-1.5">
                    <Skeleton variant="text" className="w-24 h-4" />
                    <Skeleton variant="text" className="w-8 h-4" />
                  </Stack>
                  <Skeleton variant="rounded" className="w-full h-2" />
                </div>
              ))
            : projects!.map((p) => (
                <div key={p.name}>
                  <Stack direction="horizontal" justify="between" className="mb-1.5">
                    <Typography variant="caption" ellipsis>{p.name}</Typography>
                    <Typography variant="caption" color="secondary">
                      {Math.round((p.tasks.done / p.tasks.total) * 100)}%
                    </Typography>
                  </Stack>
                  <ProgressBar value={(p.tasks.done / p.tasks.total) * 100} size="sm" color="primary" />
                </div>
              ))}
        </Stack>
      </Card.Content>
      <Card.Footer>
        <Stack direction="horizontal" gap={2} wrap>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="rounded" className="w-12 h-5" />
              ))
            : projects!.map((p) => (
                <Badge key={p.name} color={p.statusColor} variant="soft" size="sm">{p.status}</Badge>
              ))}
        </Stack>
      </Card.Footer>
    </Card>
  )
}
