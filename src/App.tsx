import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Icon,
  IconButton,
  Paper,
  Spinner,
  Stack,
  Typography,
} from 'mongle-ui'
import {
  Bell,
  KanbanSquare,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Settings,
  ShoppingBag,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import TeamDashboard from './pages/TeamDashboard'
import SocialFeed from './pages/SocialFeed'

const navItems: { path: string; label: string; icon: LucideIcon }[] = [
  { path: '/', label: '팀 대시보드', icon: LayoutDashboard },
  { path: '/social', label: '소셜 피드', icon: MessageSquare },
  { path: '/kanban', label: '칸반 보드', icon: KanbanSquare },
  { path: '/catalog', label: '상품 목록', icon: ShoppingBag },
]

function ComingSoon() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Spinner size="lg" color="primary" />
      <Stack direction="vertical" gap={1} align="center">
        <Typography variant="heading4" color="secondary">준비 중</Typography>
        <Typography variant="body2" color="disabled">이 페이지는 곧 추가됩니다.</Typography>
      </Stack>
      <Button variant="outline" size="sm" onClick={() => navigate('/')}>
        대시보드로 돌아가기
      </Button>
    </div>
  )
}

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Paper elevation={2} radius="none" className="w-64 h-full flex flex-col shrink-0">
        {/* Logo */}
        <Stack direction="horizontal" align="center" gap={2} className="px-5 py-5">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <Typography variant="subtitle2" className="text-white font-bold">M</Typography>
          </div>
          <Typography variant="subtitle1">mongle</Typography>
          <Badge color="info" variant="soft" size="sm">beta</Badge>
        </Stack>

        <Divider />

        {/* Nav items */}
        <Stack direction="vertical" gap={1} className="flex-1 p-3 overflow-auto">
          <Typography variant="overline" color="secondary" className="px-3 pt-2 pb-1">
            메뉴
          </Typography>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? 'soft' : 'ghost'}
                  color={isActive ? 'primary' : 'neutral'}
                  leftIcon={<Icon icon={item.icon} size="sm" />}
                  fullWidth
                  className="justify-start"
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}

          <Divider className="my-2" />

          <Typography variant="overline" color="secondary" className="px-3 pt-2 pb-1">
            설정
          </Typography>
          <Button variant="ghost" color="neutral" leftIcon={<Icon icon={Bell} size="sm" />} fullWidth className="justify-start">
            <span className="flex-1 text-left">알림</span>
            <Badge color="error" size="sm">3</Badge>
          </Button>
          <Button variant="ghost" color="neutral" leftIcon={<Icon icon={Settings} size="sm" />} fullWidth className="justify-start">
            설정
          </Button>
        </Stack>

        {/* User profile */}
        <Divider />
        <Stack direction="horizontal" align="center" gap={3} className="p-4">
          <Avatar name="현진 이" color="primary" size="sm" />
          <Stack direction="vertical" gap={0} className="flex-1 min-w-0">
            <Typography variant="subtitle2">현진 이</Typography>
            <Typography variant="caption" color="secondary">관리자</Typography>
          </Stack>
          <IconButton icon={MoreHorizontal} variant="ghost" size="sm" />
        </Stack>
      </Paper>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<TeamDashboard />} />
          <Route path="/social" element={<SocialFeed />} />
          <Route path="/kanban" element={<ComingSoon />} />
          <Route path="/catalog" element={<ComingSoon />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
