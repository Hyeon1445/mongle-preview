import { useState, useEffect } from 'react'
import { Badge, Button, Card, Divider, Grid, Icon, IconButton, Stack, Transition, Typography } from 'mongle-ui'
import type { Color } from 'mongle-ui'
import {
  AlertCircle,
  Bell,
  Bug,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  Plus,
  Rocket,
  Star,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import StatCard from '../components/team-dashboard/StatCard'
import ProjectCard from '../components/team-dashboard/ProjectCard'
import type { ProjectCardData } from '../components/team-dashboard/ProjectCard'
import TeamMemberRow from '../components/team-dashboard/TeamMemberRow'
import type { TeamMemberData } from '../components/team-dashboard/TeamMemberRow'
import ActivityItem from '../components/team-dashboard/ActivityItem'
import type { ActivityItemData } from '../components/team-dashboard/ActivityItem'
import ActivityTrendCard from '../components/team-dashboard/ActivityTrendCard'
import ProjectProgressCard from '../components/team-dashboard/ProjectProgressCard'

const stats: { label: string; value: string; icon: LucideIcon; badge: { label: string; color: Color } }[] = [
  { label: '전체 팀원', value: '12', icon: Users, badge: { label: '+2 이번 달', color: 'success' } },
  { label: '진행 중인 프로젝트', value: '8', icon: Rocket, badge: { label: '3 마감 임박', color: 'warning' } },
  { label: '이번 주 완료', value: '47', icon: CheckCircle2, badge: { label: '+12 지난 주 대비', color: 'info' } },
  { label: '미해결 이슈', value: '3', icon: AlertCircle, badge: { label: '1 긴급', color: 'error' } },
]

const projects: ProjectCardData[] = [
  {
    name: 'mongle-ui v0.2.0',
    desc: '새로운 컴포넌트 추가 및 기존 버그 수정 작업. Tooltip, Modal, Select 컴포넌트 구현 예정.',
    status: '진행중',
    statusColor: 'info',
    cardVariant: 'elevated',
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
    members: ['Bob', 'Eve', 'Frank', 'Alice'],
    dueDate: '2026-03-20',
    tasks: { done: 15, total: 15 },
  },
]

const teamMembers: TeamMemberData[] = [
  { name: 'Alice Kim', role: 'Dev', status: '온라인', statusColor: 'success', avatarColor: 'primary' },
  { name: 'Bob Lee', role: 'PM', status: '집중 모드', statusColor: 'warning', avatarColor: 'secondary' },
  { name: 'Carol Park', role: 'Design', status: '온라인', statusColor: 'success', avatarColor: 'accent' },
  { name: 'Dave Choi', role: 'QA', status: '자리 비움', statusColor: 'secondary', avatarColor: 'warm' },
  { name: 'Eve Jung', role: 'Dev', status: '온라인', statusColor: 'success', avatarColor: 'neutral' },
  { name: 'Frank Oh', role: 'Dev', status: '오프라인', statusColor: 'error', avatarColor: 'primary' },
]

const activitiesToday: ActivityItemData[] = [
  { user: 'Carol', action: 'PR #42 코드 리뷰 완료 — Button ripple 효과 수정', icon: GitPullRequest, tag: '완료', tagColor: 'success', time: '10분 전', avatarColor: 'accent' },
  { user: 'Alice', action: 'mongle-ui v0.1.9 main 브랜치 머지', icon: GitMerge, tag: 'Dev', tagColor: 'info', time: '1시간 전', avatarColor: 'primary' },
  { user: 'Bob', action: '이슈 #18 긴급 등록 — 모바일 레이아웃 깨짐', icon: AlertCircle, tag: '긴급', tagColor: 'error', time: '2시간 전', avatarColor: 'secondary' },
  { user: 'Dave', action: 'Badge 컴포넌트 접근성 테스트 케이스 추가', icon: CheckCircle2, tag: 'QA', tagColor: 'secondary', time: '3시간 전', avatarColor: 'warm' },
]

const activitiesYesterday: ActivityItemData[] = [
  { user: 'Eve', action: 'Storybook GitHub Pages 배포 성공', icon: Rocket, tag: '배포', tagColor: 'success', time: '어제 18:30', avatarColor: 'neutral' },
  { user: 'Frank', action: '버그 리포트 #17 — Badge soft variant 색상 이슈', icon: Bug, tag: '버그', tagColor: 'error', time: '어제 15:12', avatarColor: 'primary' },
  { user: 'Carol', action: 'Figma 컴포넌트 스펙 v2 업데이트 공유', icon: MessageSquare, tag: 'Design', tagColor: 'secondary', time: '어제 11:05', avatarColor: 'accent' },
  { user: 'Bob', action: '스프린트 3 킥오프 미팅 노트 업로드', icon: Star, tag: 'PM', tagColor: 'warning', time: '어제 10:00', avatarColor: 'secondary' },
]

export default function TeamDashboard() {
  const [loading, setLoading] = useState(true)
  const [showMoreActivity, setShowMoreActivity] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <Stack direction="horizontal" align="center" justify="between" className="mb-8">
        <Stack direction="vertical" gap={1}>
          <Typography variant="heading2">팀 대시보드</Typography>
          <Stack direction="horizontal" gap={2} align="center">
            <Typography variant="body2" color="secondary">2026년 3월 23일 월요일</Typography>
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
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCard key={i} isLoading />)
          : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </Grid>

      {/* Chart Section */}
      <Grid columns={3} gap={6} className="mb-8">
        <ActivityTrendCard isLoading={loading} />
        <ProjectProgressCard isLoading={loading} projects={projects} />
      </Grid>

      {/* Projects + Team Members */}
      <Grid columns={3} gap={6} className="mb-8">
        <div className="col-span-2">
          <Stack direction="horizontal" align="center" justify="between" className="mb-4">
            <Stack direction="horizontal" align="center" gap={2}>
              <Typography variant="heading4">진행 중인 프로젝트</Typography>
              <Badge color="secondary" variant="soft" size="sm">3개</Badge>
            </Stack>
            <Button variant="ghost" size="sm" color="primary">전체 보기</Button>
          </Stack>
          <Stack direction="vertical" gap={4}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <ProjectCard key={i} isLoading />)
              : projects.map((p) => <ProjectCard key={p.name} data={p} />)}
          </Stack>
        </div>

        <div>
          <Stack direction="horizontal" align="center" justify="between" className="mb-4">
            <Typography variant="heading4">팀원 현황</Typography>
            <Button variant="ghost" size="sm" color="primary">관리</Button>
          </Stack>
          <Card variant="elevated">
            <Card.Content>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TeamMemberRow key={i} isLoading last={i === 5} />
                  ))
                : teamMembers.map((m, i) => (
                    <TeamMemberRow key={m.name} data={m} last={i === teamMembers.length - 1} />
                  ))}
            </Card.Content>
          </Card>
        </div>
      </Grid>

      {/* Activity Feed */}
      <div>
        <Stack direction="horizontal" align="center" justify="between" className="mb-4">
          <Stack direction="horizontal" align="center" gap={2}>
            <Typography variant="heading4">최근 활동</Typography>
            <Badge color="error" size="sm">1 긴급</Badge>
          </Stack>
          <Button variant="ghost" size="sm" color="primary">전체 보기</Button>
        </Stack>
        <Card variant="elevated">
          <Card.Content>
            <Divider label="오늘" className="mb-2" />
            <Stack direction="vertical" gap={0}>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ActivityItem key={i} isLoading last={i === 3} />
                  ))
                : activitiesToday.map((a, i) => (
                    <ActivityItem key={i} data={a} last={i === activitiesToday.length - 1} />
                  ))}
            </Stack>

            <Transition in={showMoreActivity} type="collapse" unmountOnExit>
              <div>
                <Divider label="어제" className="my-2" />
                <Stack direction="vertical" gap={0}>
                  {activitiesYesterday.map((a, i) => (
                    <ActivityItem key={i} data={a} last={i === activitiesYesterday.length - 1} />
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
              rightIcon={<Icon icon={showMoreActivity ? ChevronUp : ChevronDown} size="sm" />}
              onClick={() => setShowMoreActivity((v) => !v)}
            >
              {showMoreActivity ? '접기' : '이전 활동 더 보기'}
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}
