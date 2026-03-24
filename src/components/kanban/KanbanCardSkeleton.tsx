import { Card, Skeleton, Stack } from 'mongle-ui'

export default function KanbanCardSkeleton() {
  return (
    <Card variant="elevated">
      <Card.Content className="p-3">
        <Stack direction="vertical" gap={2}>
          <Stack direction="horizontal" align="center" justify="between">
            <Skeleton variant="rounded" className="h-5 w-14" />
            <Skeleton variant="rounded" className="h-4 w-4" />
          </Stack>
          <Skeleton variant="text" className="h-4 w-4/5" />
          <Stack direction="vertical" gap={1}>
            <Skeleton variant="text" className="h-3 w-full" />
            <Skeleton variant="text" className="h-3 w-2/3" />
          </Stack>
          <Stack direction="horizontal" gap={1}>
            <Skeleton variant="rounded" className="h-4 w-12" />
            <Skeleton variant="rounded" className="h-4 w-16" />
          </Stack>
          <Stack direction="horizontal" align="center" justify="between">
            <div className="flex -space-x-2">
              <Skeleton variant="circular" className="h-6 w-6" />
              <Skeleton variant="circular" className="h-6 w-6" />
            </div>
            <Skeleton variant="text" className="h-3 w-14" />
          </Stack>
        </Stack>
      </Card.Content>
    </Card>
  )
}
