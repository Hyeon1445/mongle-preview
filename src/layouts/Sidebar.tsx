import { NavLink } from 'react-router-dom'
import { Avatar, Badge, Button, Divider, Icon, IconButton, Paper, Stack, Typography } from 'mongle-ui'
import { Bell, KanbanSquare, LayoutDashboard, MessageSquare, MoreHorizontal, Settings, ShoppingBag, UserCircle, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const navItems: { path: string; label: string; icon: LucideIcon }[] = [
  { path: '/', label: '팀 대시보드', icon: LayoutDashboard },
  { path: '/social', label: '소셜 피드', icon: MessageSquare },
  { path: '/kanban', label: '칸반 보드', icon: KanbanSquare },
  { path: '/catalog', label: '상품 목록', icon: ShoppingBag },
  { path: '/settings', label: '프로필 설정', icon: UserCircle },
]

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <Paper elevation={2} radius="none" className="w-64 h-full flex flex-col">
      <Stack direction="horizontal" align="center" gap={2} className="px-5 py-5">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <Typography variant="subtitle2" className="text-white font-bold">M</Typography>
        </div>
        <Typography variant="subtitle1">mongle</Typography>
        <Badge color="info" variant="soft" size="sm">beta</Badge>
        {onClose && (
          <IconButton icon={X} variant="ghost" size="sm" className="ml-auto" onClick={onClose} />
        )}
      </Stack>

      <Divider />

      <Stack direction="vertical" gap={1} className="flex-1 p-3 overflow-auto">
        <Typography variant="overline" color="secondary" className="px-3 pt-2 pb-1">
          메뉴
        </Typography>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={onClose}>
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
  )
}
