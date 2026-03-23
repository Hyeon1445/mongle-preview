import { useState } from 'react'
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
  Stack,
  Transition,
  Typography,
} from 'mongle-ui'
import type { AvatarColor, CardVariant, Color } from 'mongle-ui'
import {
  AlertCircle,
  Bell,
  Bug,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Rocket,
  Star,
  Users,
} from 'lucide-react'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const stats: {
  label: string
  value: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge: { label: string; color: Color }
}[] = [
  {
    label: '전체 팀원',
    value: '12',
    icon: Users,
    badge: { label: '+2 이번 달', color: 'success' },
  },
  {
    label: '진행 중인 프로젝트',
    value: '8',
    icon: Rocket,
    badge: { label: '3 마감 임박', color: 'warning' },
  },
  {
    label: '이번 주 완료',
    value: '47',
    icon: CheckCircle2,
    badge: { label: '+12 지난 주 대비', color: 'info' },
  },
  {
    label: '미해결 이슈',
    value: '3',
    icon: AlertCircle,
    badge: { label: '1 긴급', color: 'error' },
  },
]

const projects: {
  name: string
  desc: string
  status: string
  statusColor: Color
  cardVariant: CardVariant
  barColor: string
  members: string[]
  dueDate: string
  tasks: { done: number; total: number }
}[] = [
  {
    name: 'mongle-ui v0.2.0',
    desc: '새로운 컴포넌트 추가 및 기존 버그 수정 작업. Tooltip, Modal, Select 컴포넌트 구현 예정.',
    status: '진행중',
    statusColor: 'info',
    cardVariant: 'elevated',
    barColor: '#ff8b6d',
    members: ['Alice', 'Bob', 'Carol'],
    dueDate: '2026-04-01',
    tasks: { done: 12, total: 20 },
  },
  {
    name: '디자인 시스템 가이드',
    desc: '컴포넌트 사용 가이드라인 및 Storybook 문서 정비. 색상·타이포그래피 토큰 정리 포함.',
    status: '검토중',
    statusColor: 'warning',
    cardVariant: 'outlined',
    barColor: '#ff8b6d',
    members: ['Carol', 'Dave'],
    dueDate: '2026-03-28',
    tasks: { done: 8, total: 10 },
  },
  {
    name: 'Storybook 배포 자동화',
    desc: 'GitHub Actions 워크플로우 구축 및 CI/CD 파이프라인 설정 완료.',
    status: '완료',
    statusColor: 'success',
    cardVariant: 'filled',
    barColor: '#ff8b6d',
    members: ['Bob', 'Eve', 'Frank', 'Alice'],
    dueDate: '2026-03-20',
    tasks: { done: 15, total: 15 },
  },
]

const weeklyChartData = {
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

const weeklyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1000, easing: 'easeInOutQuart' as const },
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: { boxWidth: 12, font: { size: 12 } },
    },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { display: false },
    },
  },
}

const teamMembers: {
  name: string
  role: string
  status: string
  statusColor: Color
  avatarColor: AvatarColor
}[] = [
  { name: 'Alice Kim', role: 'Dev', status: '온라인', statusColor: 'success', avatarColor: 'primary' },
  { name: 'Bob Lee', role: 'PM', status: '집중 모드', statusColor: 'warning', avatarColor: 'secondary' },
  { name: 'Carol Park', role: 'Design', status: '온라인', statusColor: 'success', avatarColor: 'accent' },
  { name: 'Dave Choi', role: 'QA', status: '자리 비움', statusColor: 'secondary', avatarColor: 'warm' },
  { name: 'Eve Jung', role: 'Dev', status: '온라인', statusColor: 'success', avatarColor: 'neutral' },
  { name: 'Frank Oh', role: 'Dev', status: '오프라인', statusColor: 'error', avatarColor: 'primary' },
]

const activitiesToday: {
  user: string
  action: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  tag: string
  tagColor: Color
  time: string
  avatarColor: AvatarColor
}[] = [
  {
    user: 'Carol',
    action: 'PR #42 코드 리뷰 완료 — Button ripple 효과 수정',
    icon: GitPullRequest,
    tag: '완료',
    tagColor: 'success',
    time: '10분 전',
    avatarColor: 'accent',
  },
  {
    user: 'Alice',
    action: 'mongle-ui v0.1.9 main 브랜치 머지',
    icon: GitMerge,
    tag: 'Dev',
    tagColor: 'info',
    time: '1시간 전',
    avatarColor: 'primary',
  },
  {
    user: 'Bob',
    action: '이슈 #18 긴급 등록 — 모바일 레이아웃 깨짐',
    icon: AlertCircle,
    tag: '긴급',
    tagColor: 'error',
    time: '2시간 전',
    avatarColor: 'secondary',
  },
  {
    user: 'Dave',
    action: 'Badge 컴포넌트 접근성 테스트 케이스 추가',
    icon: CheckCircle2,
    tag: 'QA',
    tagColor: 'secondary',
    time: '3시간 전',
    avatarColor: 'warm',
  },
]

const activitiesYesterday: {
  user: string
  action: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  tag: string
  tagColor: Color
  time: string
  avatarColor: AvatarColor
}[] = [
  {
    user: 'Eve',
    action: 'Storybook GitHub Pages 배포 성공',
    icon: Rocket,
    tag: '배포',
    tagColor: 'success',
    time: '어제 18:30',
    avatarColor: 'neutral',
  },
  {
    user: 'Frank',
    action: '버그 리포트 #17 — Badge soft variant 색상 이슈',
    icon: Bug,
    tag: '버그',
    tagColor: 'error',
    time: '어제 15:12',
    avatarColor: 'primary',
  },
  {
    user: 'Carol',
    action: 'Figma 컴포넌트 스펙 v2 업데이트 공유',
    icon: MessageSquare,
    tag: 'Design',
    tagColor: 'secondary',
    time: '어제 11:05',
    avatarColor: 'accent',
  },
  {
    user: 'Bob',
    action: '스프린트 3 킥오프 미팅 노트 업로드',
    icon: Star,
    tag: 'PM',
    tagColor: 'warning',
    time: '어제 10:00',
    avatarColor: 'secondary',
  },
]

export default function TeamDashboard() {
  const [showMoreActivity, setShowMoreActivity] = useState(false)

  return (
    <div className="p-8">
      {/* Header */}
      <Stack direction="horizontal" align="center" justify="between" className="mb-8">
        <Stack direction="vertical" gap={1}>
          <Typography variant="heading2">팀 대시보드</Typography>
          <Stack direction="horizontal" gap={2} align="center">
            <Typography variant="body2" color="secondary">
              2026년 3월 23일 월요일
            </Typography>
            <Badge color="success" variant="soft" size="sm">온라인 3명</Badge>
            <Badge color="info" variant="soft" size="sm">스프린트 3</Badge>
          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={2} align="center">
          <IconButton icon={Bell} variant="outline" size="sm" />
          <Button variant="outline" size="sm" leftIcon={<Icon icon={Calendar} size="sm" />}>
            일정 보기
          </Button>
          <Button variant="solid" color="primary" size="sm" leftIcon={<Icon icon={Plus} size="sm" />}>
            팀원 초대
          </Button>
        </Stack>
      </Stack>

      {/* Stat Cards */}
      <Grid columns={4} gap={4} className="mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardHeader>
              <Stack direction="horizontal" align="center" justify="between">
                <Typography variant="overline" color="secondary">
                  {stat.label}
                </Typography>
                <Icon icon={stat.icon} size="sm" color="muted" />
              </Stack>
            </CardHeader>
            <CardContent>
              <Typography variant="heading1">{stat.value}</Typography>
            </CardContent>
            <CardFooter>
              <Badge color={stat.badge.color} variant="soft" size="sm">
                {stat.badge.label}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </Grid>

      {/* Chart Section */}
      <Grid columns={3} gap={6} className="mb-8">
        <Card variant="elevated" className="col-span-2">
          <CardHeader>
            <Stack direction="horizontal" align="center" justify="between">
              <Stack direction="vertical" gap={0}>
                <Typography variant="subtitle1">이번 주 활동 트렌드</Typography>
                <Typography variant="caption" color="secondary">3월 17일 — 3월 23일</Typography>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <Badge color="info" variant="soft" size="sm">완료 태스크 58</Badge>
                <Badge color="warning" variant="soft" size="sm">등록 이슈 21</Badge>
              </Stack>
            </Stack>
          </CardHeader>
          <CardContent>
            <div style={{ height: 200 }}>
              <Line data={weeklyChartData} options={weeklyChartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <Typography variant="subtitle1">프로젝트 진행률</Typography>
            <Typography variant="caption" color="secondary">전체 3개 프로젝트</Typography>
          </CardHeader>
          <CardContent>
            <Stack direction="vertical" gap={4}>
              {projects.map((p) => (
                <div key={p.name}>
                  <Stack direction="horizontal" justify="between" className="mb-1.5">
                    <Typography variant="caption" ellipsis>{p.name}</Typography>
                    <Typography variant="caption" color="secondary">
                      {Math.round((p.tasks.done / p.tasks.total) * 100)}%
                    </Typography>
                  </Stack>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(p.tasks.done / p.tasks.total) * 100}%`,
                        backgroundColor: p.barColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </Stack>
          </CardContent>
          <CardFooter>
            <Stack direction="horizontal" gap={2} wrap>
              {projects.map((p) => (
                <Badge key={p.name} color={p.statusColor} variant="soft" size="sm">
                  {p.status}
                </Badge>
              ))}
            </Stack>
          </CardFooter>
        </Card>
      </Grid>

      {/* Projects + Team Members */}
      <Grid columns={3} gap={6} className="mb-8">
        {/* Projects */}
        <div className="col-span-2">
          <Stack direction="horizontal" align="center" justify="between" className="mb-4">
            <Stack direction="horizontal" align="center" gap={2}>
              <Typography variant="heading4">진행 중인 프로젝트</Typography>
              <Badge color="secondary" variant="soft" size="sm">
                3개
              </Badge>
            </Stack>
            <Button variant="ghost" size="sm" color="primary">
              전체 보기
            </Button>
          </Stack>
          <Stack direction="vertical" gap={4}>
            {projects.map((project) => (
              <Card key={project.name} variant={project.cardVariant}>
                <CardHeader>
                  <Stack direction="horizontal" align="center" justify="between">
                    <Stack direction="horizontal" align="center" gap={2}>
                      <Typography variant="subtitle1">{project.name}</Typography>
                      <Badge color={project.statusColor} variant="soft" size="sm">
                        {project.status}
                      </Badge>
                    </Stack>
                    <IconButton icon={MoreHorizontal} variant="ghost" size="sm" />
                  </Stack>
                </CardHeader>
                <CardContent>
                  <Typography variant="body2" color="secondary">
                    {project.desc}
                  </Typography>
                  <div className="mt-3">
                    <Stack direction="horizontal" justify="between" className="mb-1.5">
                      <Typography variant="caption" color="secondary">
                        진행률
                      </Typography>
                      <Typography variant="caption" color="secondary">
                        {project.tasks.done} / {project.tasks.total} ({Math.round((project.tasks.done / project.tasks.total) * 100)}%)
                      </Typography>
                    </Stack>
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${(project.tasks.done / project.tasks.total) * 100}%`,
                          backgroundColor: project.barColor,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Stack direction="horizontal" align="center" justify="between">
                    <AvatarGroup size="sm" max={4}>
                      {project.members.map((m) => (
                        <Avatar key={m} name={m} size="sm" />
                      ))}
                    </AvatarGroup>
                    <Stack direction="horizontal" align="center" gap={1}>
                      <Icon icon={Clock} size="sm" color="muted" />
                      <Typography variant="caption" color="secondary">
                        {project.dueDate}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardFooter>
              </Card>
            ))}
          </Stack>
        </div>

        {/* Team Members */}
        <div>
          <Stack direction="horizontal" align="center" justify="between" className="mb-4">
            <Typography variant="heading4">팀원 현황</Typography>
            <Button variant="ghost" size="sm" color="primary">
              관리
            </Button>
          </Stack>
          <Card variant="elevated">
            <CardContent>
              {teamMembers.map((member, index) => (
                <div key={member.name}>
                  <Stack
                    direction="horizontal"
                    align="center"
                    gap={3}
                    className="py-2"
                  >
                    <Avatar
                      name={member.name}
                      color={member.avatarColor}
                      size="md"
                    />
                    <Stack direction="vertical" gap={0} className="flex-1 min-w-0">
                      <Typography variant="subtitle2" ellipsis>
                        {member.name}
                      </Typography>
                      <Stack direction="horizontal" gap={1} align="center">
                        <Badge
                          color={member.statusColor}
                          variant="soft"
                          size="sm"
                        >
                          {member.status}
                        </Badge>
                        <Typography variant="caption" color="disabled">
                          {member.role}
                        </Typography>
                      </Stack>
                    </Stack>
                    <IconButton icon={MessageSquare} variant="ghost" size="sm" />
                  </Stack>
                  {index < teamMembers.length - 1 && <Divider color="light" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Grid>

      {/* Activity Feed */}
      <div>
        <Stack direction="horizontal" align="center" justify="between" className="mb-4">
          <Stack direction="horizontal" align="center" gap={2}>
            <Typography variant="heading4">최근 활동</Typography>
            <Badge color="error" size="sm">
              1 긴급
            </Badge>
          </Stack>
          <Button variant="ghost" size="sm" color="primary">
            전체 보기
          </Button>
        </Stack>
        <Card variant="elevated">
          <CardContent>
          <Divider label="오늘" className="mb-2" />
          <Stack direction="vertical" gap={0}>
            {activitiesToday.map((activity, index) => (
              <div key={index}>
                <Stack
                  direction="horizontal"
                  align="center"
                  gap={3}
                  className="py-3"
                >
                  <Avatar
                    name={activity.user}
                    color={activity.avatarColor}
                    size="sm"
                  />
                  <Stack
                    direction="horizontal"
                    gap={2}
                    align="center"
                    className="flex-1 min-w-0"
                  >
                    <Icon icon={activity.icon} size="sm" color="muted" />
                    <Typography variant="body2" ellipsis className="flex-1">
                      {activity.action}
                    </Typography>
                    <Badge
                      color={activity.tagColor}
                      variant="soft"
                      size="sm"
                    >
                      {activity.tag}
                    </Badge>
                  </Stack>
                  <Typography
                    variant="caption"
                    color="secondary"
                    className="whitespace-nowrap"
                  >
                    {activity.time}
                  </Typography>
                </Stack>
                {index < activitiesToday.length - 1 && (
                  <Divider color="light" />
                )}
              </div>
            ))}
          </Stack>

          <Transition in={showMoreActivity} type="collapse" unmountOnExit>
            <div>
              <Divider label="어제" className="my-2" />
              <Stack direction="vertical" gap={0}>
                {activitiesYesterday.map((activity, index) => (
                  <div key={index}>
                    <Stack
                      direction="horizontal"
                      align="center"
                      gap={3}
                      className="py-3"
                    >
                      <Avatar
                        name={activity.user}
                        color={activity.avatarColor}
                        size="sm"
                      />
                      <Stack
                        direction="horizontal"
                        gap={2}
                        align="center"
                        className="flex-1 min-w-0"
                      >
                        <Icon icon={activity.icon} size="sm" color="muted" />
                        <Typography variant="body2" ellipsis className="flex-1">
                          {activity.action}
                        </Typography>
                        <Badge
                          color={activity.tagColor}
                          variant="soft"
                          size="sm"
                        >
                          {activity.tag}
                        </Badge>
                      </Stack>
                      <Typography
                        variant="caption"
                        color="secondary"
                        className="whitespace-nowrap"
                      >
                        {activity.time}
                      </Typography>
                    </Stack>
                    {index < activitiesYesterday.length - 1 && (
                      <Divider color="light" />
                    )}
                  </div>
                ))}
              </Stack>
            </div>
          </Transition>

          <Divider className="mt-2 mb-3" />
          <Button
            variant="ghost"
            color="secondary"
            size="sm"
            fullWidth
            rightIcon={
              <Icon
                icon={showMoreActivity ? ChevronUp : ChevronDown}
                size="sm"
              />
            }
            onClick={() => setShowMoreActivity((v) => !v)}
          >
            {showMoreActivity ? '접기' : '이전 활동 더 보기'}
          </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
