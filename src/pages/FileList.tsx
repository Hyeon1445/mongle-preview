import { useState, useEffect } from 'react'
import { Avatar, AvatarGroup, Badge, Button, Card, Icon, IconButton, Skeleton, Stack, Typography } from 'mongle-ui'
import {
  ChevronDown,
  ChevronUp,
  Clock,
  File,
  FileText,
  FolderOpen,
  Grid3X3,
  HardDrive,
  Image,
  List,
  MoreHorizontal,
  Plus,
  Presentation,
  Search,
  Share2,
  Star,
  Table2,
  Upload,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AvatarColor, Color } from 'mongle-ui'

interface FileData {
  id: string
  name: string
  type: '문서' | '시트' | '발표' | '이미지' | '기타'
  modifiedAt: string
  modifiedTimestamp: number
  size: string
  sizeBytes: number
  starred: boolean
  folder: '개발' | '기획' | '디자인'
  sharedWith: number
  collaborators: { name: string; color: AvatarColor }[]
}

const TYPE_CONFIG: Record<FileData['type'], { icon: LucideIcon; color: Color; bg: string }> = {
  문서: { icon: FileText, color: 'info', bg: 'bg-blue-50' },
  시트: { icon: Table2, color: 'success', bg: 'bg-green-50' },
  발표: { icon: Presentation, color: 'warning', bg: 'bg-amber-50' },
  이미지: { icon: Image, color: 'secondary', bg: 'bg-purple-50' },
  기타: { icon: File, color: 'neutral', bg: 'bg-gray-100' },
}

const FILES: FileData[] = [
  { id: '1', name: 'mongle-ui v0.2 릴리즈 노트', type: '문서', modifiedAt: '2시간 전', modifiedTimestamp: Date.now() - 7200000, size: '12 KB', sizeBytes: 12000, starred: true, folder: '개발', sharedWith: 2, collaborators: [{ name: 'Carol Park', color: 'accent' }, { name: 'Alice Kim', color: 'primary' }] },
  { id: '2', name: '컴포넌트 스펙 시트', type: '시트', modifiedAt: '어제', modifiedTimestamp: Date.now() - 86400000, size: '28 KB', sizeBytes: 28000, starred: false, folder: '개발', sharedWith: 3, collaborators: [{ name: 'Bob Lee', color: 'secondary' }, { name: 'Carol Park', color: 'accent' }, { name: 'Dave Choi', color: 'warm' }] },
  { id: '3', name: '스프린트 3 킥오프 발표', type: '발표', modifiedAt: '3일 전', modifiedTimestamp: Date.now() - 259200000, size: '4.2 MB', sizeBytes: 4200000, starred: true, folder: '기획', sharedWith: 2, collaborators: [{ name: 'Bob Lee', color: 'secondary' }, { name: 'Alice Kim', color: 'primary' }] },
  { id: '4', name: '색상 토큰 가이드', type: '문서', modifiedAt: '1일 전', modifiedTimestamp: Date.now() - 172800000, size: '8 KB', sizeBytes: 8000, starred: false, folder: '디자인', sharedWith: 2, collaborators: [{ name: 'Carol Park', color: 'accent' }, { name: 'Frank Oh', color: 'primary' }] },
  { id: '5', name: '브랜드 아이덴티티 에셋', type: '이미지', modifiedAt: '5일 전', modifiedTimestamp: Date.now() - 432000000, size: '18 MB', sizeBytes: 18000000, starred: false, folder: '디자인', sharedWith: 1, collaborators: [{ name: 'Carol Park', color: 'accent' }] },
  { id: '6', name: '분기별 개발 로드맵', type: '시트', modifiedAt: '어제', modifiedTimestamp: Date.now() - 90000000, size: '52 KB', sizeBytes: 52000, starred: true, folder: '기획', sharedWith: 3, collaborators: [{ name: 'Bob Lee', color: 'secondary' }, { name: 'Eve Jung', color: 'neutral' }, { name: 'Alice Kim', color: 'primary' }] },
  { id: '7', name: 'Storybook 운영 가이드', type: '문서', modifiedAt: '3일 전', modifiedTimestamp: Date.now() - 270000000, size: '15 KB', sizeBytes: 15000, starred: false, folder: '개발', sharedWith: 2, collaborators: [{ name: 'Alice Kim', color: 'primary' }, { name: 'Dave Choi', color: 'warm' }] },
  { id: '8', name: '팀 온보딩 자료', type: '발표', modifiedAt: '1주 전', modifiedTimestamp: Date.now() - 604800000, size: '6.8 MB', sizeBytes: 6800000, starred: false, folder: '기획', sharedWith: 1, collaborators: [{ name: 'Bob Lee', color: 'secondary' }] },
  { id: '9', name: '접근성 체크리스트', type: '문서', modifiedAt: '2일 전', modifiedTimestamp: Date.now() - 180000000, size: '9 KB', sizeBytes: 9000, starred: false, folder: '개발', sharedWith: 2, collaborators: [{ name: 'Dave Choi', color: 'warm' }, { name: 'Frank Oh', color: 'primary' }] },
  { id: '10', name: '컴포넌트 스크린샷 모음', type: '이미지', modifiedAt: '4일 전', modifiedTimestamp: Date.now() - 345600000, size: '34 MB', sizeBytes: 34000000, starred: false, folder: '디자인', sharedWith: 3, collaborators: [{ name: 'Carol Park', color: 'accent' }, { name: 'Alice Kim', color: 'primary' }, { name: 'Eve Jung', color: 'neutral' }] },
  { id: '11', name: '버그 트래킹 시트', type: '시트', modifiedAt: '방금 전', modifiedTimestamp: Date.now() - 120000, size: '16 KB', sizeBytes: 16000, starred: false, folder: '개발', sharedWith: 2, collaborators: [{ name: 'Frank Oh', color: 'primary' }, { name: 'Bob Lee', color: 'secondary' }] },
  { id: '12', name: 'PR 리뷰 체크리스트', type: '문서', modifiedAt: '6일 전', modifiedTimestamp: Date.now() - 518400000, size: '5 KB', sizeBytes: 5000, starred: false, folder: '개발', sharedWith: 1, collaborators: [{ name: 'Alice Kim', color: 'primary' }] },
]

type TabId = 'all' | 'recent' | 'starred' | 'shared' | '개발' | '기획' | '디자인'
type SortKey = 'name' | 'modifiedTimestamp' | 'sizeBytes' | 'type'
type SortDir = 'asc' | 'desc'

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: '전체', icon: HardDrive },
  { id: 'recent', label: '최근', icon: Clock },
  { id: 'starred', label: '즐겨찾기', icon: Star },
  { id: 'shared', label: '공유됨', icon: Share2 },
  { id: '개발', label: '개발', icon: FolderOpen },
  { id: '기획', label: '기획', icon: FolderOpen },
  { id: '디자인', label: '디자인', icon: FolderOpen },
]

const NOW = Date.now()

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  return sortKey === col ? (
    <Icon icon={sortDir === 'asc' ? ChevronUp : ChevronDown} size="sm" color="primary" />
  ) : null
}

export default function FileList() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [sortKey, setSortKey] = useState<SortKey>('modifiedTimestamp')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = FILES
    .filter((f) => {
      if (activeTab === 'starred') return f.starred
      if (activeTab === 'recent') return f.modifiedTimestamp > NOW - 86400000 * 3
      if (activeTab === 'shared') return f.sharedWith > 1
      if (activeTab === '개발' || activeTab === '기획' || activeTab === '디자인') return f.folder === activeTab
      return true
    })
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'name') return mul * a.name.localeCompare(b.name)
      if (sortKey === 'type') return mul * a.type.localeCompare(b.type)
      return mul * (a[sortKey] - b[sortKey])
    })

  return (
    <div className="p-4 sm:p-6">
      {/* Header row */}
      <Stack direction="horizontal" align="center" justify="between" className="mb-5">
        <Stack direction="horizontal" align="center" gap={2}>
          <Icon icon={FolderOpen} size="md" color="primary" />
          <Typography variant="heading3">파일 목록</Typography>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <div className="relative hidden sm:block">
            <Icon icon={Search} size="sm" color="muted" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="검색..."
              className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 w-44 focus:w-56 transition-all"
            />
          </div>
          <Button variant="outline" size="sm" leftIcon={<Icon icon={Upload} size="sm" />} className="hidden sm:flex">
            업로드
          </Button>
          <Button variant="solid" color="primary" size="sm" leftIcon={<Icon icon={Plus} size="sm" />}>
            새 파일
          </Button>
        </Stack>
      </Stack>

      {/* Tabs + view toggle */}
      <Stack direction="horizontal" align="center" justify="between" className="mb-4">
        <div className="flex gap-0.5 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            const count = tab.id === 'all' ? FILES.length
              : tab.id === 'starred' ? FILES.filter((f) => f.starred).length
              : tab.id === 'recent' ? FILES.filter((f) => f.modifiedTimestamp > Date.now() - 86400000 * 3).length
              : tab.id === 'shared' ? FILES.filter((f) => f.sharedWith > 1).length
              : FILES.filter((f) => f.folder === tab.id).length
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus:outline-none ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <Icon icon={tab.icon} size="sm" color={isActive ? 'primary' : 'muted'} />
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <Stack direction="horizontal" gap={1} className="shrink-0">
          <IconButton icon={List} variant={view === 'list' ? 'soft' : 'ghost'} color={view === 'list' ? 'primary' : 'neutral'} size="sm" onClick={() => setView('list')} />
          <IconButton icon={Grid3X3} variant={view === 'grid' ? 'soft' : 'ghost'} color={view === 'grid' ? 'primary' : 'neutral'} size="sm" onClick={() => setView('grid')} />
        </Stack>
      </Stack>

      {view === 'list' ? (
        <Card variant="elevated" className="overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <div className="w-8" />
            <button onClick={() => handleSort('name')} className="flex items-center gap-1 text-left focus:outline-none group">
              <Typography variant="caption" color="secondary" className="group-hover:text-gray-700">이름</Typography>
              <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button onClick={() => handleSort('type')} className="hidden sm:flex items-center gap-1 w-16 focus:outline-none group">
              <Typography variant="caption" color="secondary" className="group-hover:text-gray-700">형식</Typography>
              <SortIcon col="type" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button onClick={() => handleSort('sizeBytes')} className="hidden md:flex items-center gap-1 w-16 justify-end focus:outline-none group">
              <Typography variant="caption" color="secondary" className="group-hover:text-gray-700">크기</Typography>
              <SortIcon col="sizeBytes" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <div className="hidden lg:block w-20">
              <Typography variant="caption" color="secondary">작업자</Typography>
            </div>
            <button onClick={() => handleSort('modifiedTimestamp')} className="flex items-center gap-1 w-20 justify-end focus:outline-none group">
              <Typography variant="caption" color="secondary" className="group-hover:text-gray-700">수정일</Typography>
              <SortIcon col="modifiedTimestamp" sortKey={sortKey} sortDir={sortDir} />
            </button>
          </div>

          <Card.Content className="p-1">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-3 px-4 py-3">
                    <Skeleton variant="rounded" className="w-8 h-8" />
                    <Skeleton variant="text" className="h-4 max-w-56" />
                    <Skeleton variant="rounded" className="hidden sm:block w-16 h-5" />
                    <Skeleton variant="text" className="hidden md:block w-16 h-3" />
                    <Skeleton variant="rounded" className="hidden lg:block w-20 h-6" />
                    <Skeleton variant="text" className="w-20 h-3" />
                  </div>
                ))
              : filtered.map((f) => {
                  const cfg = TYPE_CONFIG[f.type]
                  const isSelected = selected === f.id
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelected(isSelected ? null : f.id)}
                      className={`grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer group transition-colors ${
                        isSelected ? 'bg-primary-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                        <Icon icon={cfg.icon} size="sm" color={cfg.color} />
                      </div>
                      <Stack direction="horizontal" align="center" gap={2} className="min-w-0">
                        <Typography variant="body2" className="truncate">{f.name}</Typography>
                        {f.starred && <Icon icon={Star} size="sm" className="text-amber-400 fill-amber-400 shrink-0" />}
                      </Stack>
                      <div className="hidden sm:block w-16">
                        <Badge color={cfg.color} variant="soft" size="sm">{f.type}</Badge>
                      </div>
                      <Typography variant="caption" color="secondary" className="hidden md:block w-16 text-right">{f.size}</Typography>
                      <AvatarGroup size="sm" max={3} className="hidden lg:flex w-20">
                        {f.collaborators.map((c) => <Avatar key={c.name} name={c.name} color={c.color} size="sm" />)}
                      </AvatarGroup>
                      <Stack direction="horizontal" align="center" gap={1} className="w-20 justify-end">
                        <Typography variant="caption" color="secondary" className="truncate">{f.modifiedAt}</Typography>
                        <IconButton icon={MoreHorizontal} variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 shrink-0" />
                      </Stack>
                    </div>
                  )
                })}
          </Card.Content>

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-2">
              <Icon icon={FolderOpen} size={32} color="muted" />
              <Typography variant="body2" color="secondary">파일이 없습니다</Typography>
            </div>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Card key={i} variant="outlined">
                  <Card.Content className="p-4">
                    <Stack direction="vertical" gap={3}>
                      <Skeleton variant="rounded" className="w-10 h-10" />
                      <div>
                        <Skeleton variant="text" className="w-full h-4 mb-1" />
                        <Skeleton variant="text" className="w-2/3 h-3" />
                      </div>
                      <Stack direction="horizontal" justify="between" align="center">
                        <Skeleton variant="rounded" className="w-12 h-5" />
                        <Skeleton variant="rounded" className="w-14 h-6" />
                      </Stack>
                    </Stack>
                  </Card.Content>
                </Card>
              ))
            : filtered.map((f) => {
                const cfg = TYPE_CONFIG[f.type]
                return (
                  <Card key={f.id} variant="outlined" className="hover:shadow-md transition-shadow cursor-pointer group">
                    <Card.Content className="p-4">
                      <Stack direction="vertical" gap={3}>
                        <Stack direction="horizontal" justify="between" align="start">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                            <Icon icon={cfg.icon} size="md" color={cfg.color} />
                          </div>
                          <Stack direction="horizontal" align="center" gap={1}>
                            {f.starred && <Icon icon={Star} size="sm" className="text-amber-400 fill-amber-400" />}
                            <IconButton icon={MoreHorizontal} variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" />
                          </Stack>
                        </Stack>
                        <div>
                          <Typography variant="subtitle2" className="truncate leading-snug">{f.name}</Typography>
                          <Typography variant="caption" color="secondary">{f.modifiedAt} · {f.size}</Typography>
                        </div>
                        <Stack direction="horizontal" justify="between" align="center">
                          <Badge color={cfg.color} variant="soft" size="sm">{f.type}</Badge>
                          <AvatarGroup size="sm" max={3}>
                            {f.collaborators.map((c) => <Avatar key={c.name} name={c.name} color={c.color} size="sm" />)}
                          </AvatarGroup>
                        </Stack>
                      </Stack>
                    </Card.Content>
                  </Card>
                )
              })}
        </div>
      )}
    </div>
  )
}
