import { Badge, Card, Skeleton, Stack, Typography } from 'mongle-ui'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartData = {
  labels: ['월', '화', '수', '목', '금', '토', '일'],
  datasets: [
    {
      label: '완료 태스크',
      data: [8, 12, 7, 15, 10, 4, 2],
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointRadius: 4,
      fill: true,
      tension: 0.4,
    },
    {
      label: '등록 이슈',
      data: [3, 5, 2, 6, 4, 1, 0],
      backgroundColor: 'rgba(251, 146, 60, 0.15)',
      borderColor: 'rgb(251, 146, 60)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(251, 146, 60)',
      pointRadius: 4,
      fill: true,
      tension: 0.4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeOutQuart' as const,
  },
  animations: {
    y: {
      easing: 'easeOutQuart' as const,
      duration: 1000,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      from: (ctx: any) => ctx.chart?.scales?.y?.bottom,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: { boxWidth: 12, font: { size: 12 } },
    },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { display: false } },
    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { display: false } },
  },
}

interface ActivityTrendCardProps {
  isLoading?: boolean
}

export default function ActivityTrendCard({ isLoading }: ActivityTrendCardProps) {
  return (
    <Card variant="elevated" className="col-span-2">
      <Card.Header>
        <Stack direction="horizontal" align="center" justify="between">
          {isLoading ? (
            <>
              <Stack direction="vertical" gap={1}>
                <Skeleton variant="text" className="w-36 h-5" />
                <Skeleton variant="text" className="w-28 h-4" />
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <Skeleton variant="rounded" className="w-24 h-5" />
                <Skeleton variant="rounded" className="w-24 h-5" />
              </Stack>
            </>
          ) : (
            <>
              <Stack direction="vertical" gap={0}>
                <Typography variant="subtitle1">이번 주 활동 트렌드</Typography>
                <Typography variant="caption" color="secondary">3월 17일 — 3월 23일</Typography>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <Badge color="info" variant="soft" size="sm">완료 태스크 58</Badge>
                <Badge color="warning" variant="soft" size="sm">등록 이슈 21</Badge>
              </Stack>
            </>
          )}
        </Stack>
      </Card.Header>
      <Card.Content>
        {isLoading ? (
          <Skeleton variant="rectangular" className="w-full h-50" />
        ) : (
          <div style={{ height: 200 }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </Card.Content>
    </Card>
  )
}
