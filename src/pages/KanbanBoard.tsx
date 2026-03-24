import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Divider, Icon, IconButton, Stack, Transition, Typography } from 'mongle-ui'
import type { Color } from 'mongle-ui'
import { Filter, KanbanSquare, Plus, Search } from 'lucide-react'
import { KanbanCard } from '../components/kanban/KanbanCard'
import type { KanbanTask } from '../components/kanban/KanbanCard'

interface KanbanColumn {
  id: string
  title: string
  indicator: string
  badgeColor: Color
  tasks: KanbanTask[]
}

const INITIAL_COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: '할 일',
    indicator: 'bg-slate-400',
    badgeColor: 'neutral',
    tasks: [
      {
        id: 't1',
        title: 'Tooltip 컴포넌트 구현',
        description: 'hover/focus 트리거 지원, Popper.js 없이 자체 포지셔닝 로직 구현 필요.',
        priority: 'high',
        assignees: [{ name: 'Alice Kim', color: 'primary' }],
        dueDate: '4월 5일',
        tags: [{ label: 'Dev', color: 'info' }],
      },
      {
        id: 't2',
        title: 'Select 드롭다운 구현',
        description: '단일/다중 선택 지원. Combobox 패턴 준수. 키보드 접근성 필수.',
        priority: 'high',
        assignees: [
          { name: 'Bob Lee', color: 'secondary' },
          { name: 'Carol Park', color: 'accent' },
        ],
        dueDate: '4월 10일',
        tags: [
          { label: 'Dev', color: 'info' },
          { label: 'Design', color: 'secondary' },
        ],
      },
      {
        id: 't3',
        title: '다크 모드 토큰 정의',
        description: '색상 시스템 다크 모드 대응. CSS 변수 기반으로 토큰 계층 설계.',
        priority: 'medium',
        assignees: [{ name: 'Carol Park', color: 'accent' }],
        dueDate: '4월 15일',
        tags: [{ label: 'Design', color: 'secondary' }],
      },
      {
        id: 't4',
        title: '접근성 감사',
        description: 'WCAG 2.1 AA 기준 전체 컴포넌트 감사. axe-core 자동화 테스트 포함.',
        priority: 'low',
        assignees: [{ name: 'Dave Choi', color: 'warm' }],
        dueDate: '4월 20일',
        tags: [
          { label: 'QA', color: 'warning' },
          { label: 'A11y', color: 'success' },
        ],
      },
    ],
  },
  {
    id: 'inprogress',
    title: '진행 중',
    indicator: 'bg-blue-500',
    badgeColor: 'info',
    tasks: [
      {
        id: 'p1',
        title: 'Modal 컴포넌트 구현',
        description: 'FocusTrap, Portal, 스크롤 잠금 포함. 사이즈 3종 (sm/md/lg) 지원.',
        priority: 'high',
        assignees: [
          { name: 'Alice Kim', color: 'primary' },
          { name: 'Frank Oh', color: 'primary' },
        ],
        dueDate: '3월 30일',
        tags: [{ label: 'Dev', color: 'info' }],
        progress: 65,
      },
      {
        id: 'p2',
        title: 'Storybook 문서 정비',
        description: 'Controls, ArgTypes 전체 컴포넌트 정리. 사용 예제 페이지 구성.',
        priority: 'medium',
        assignees: [{ name: 'Carol Park', color: 'accent' }],
        dueDate: '3월 28일',
        tags: [{ label: 'Docs', color: 'secondary' }],
        progress: 40,
      },
      {
        id: 'p3',
        title: '번들 사이즈 최적화',
        description: 'Tree-shaking 개선, peer dependency 정리. 목표: gzip 10KB 이하.',
        priority: 'medium',
        assignees: [{ name: 'Bob Lee', color: 'secondary' }],
        dueDate: '4월 2일',
        tags: [{ label: 'Perf', color: 'warning' }],
        progress: 20,
      },
    ],
  },
  {
    id: 'review',
    title: '검토 중',
    indicator: 'bg-amber-500',
    badgeColor: 'warning',
    tasks: [
      {
        id: 'r1',
        title: 'Button ripple 애니메이션 수정',
        description: 'Safari에서 ripple 이펙트 끊김 현상. CSS will-change 최적화 필요.',
        priority: 'high',
        assignees: [{ name: 'Alice Kim', color: 'primary' }],
        dueDate: '3월 26일',
        tags: [
          { label: 'Dev', color: 'info' },
          { label: 'Bug', color: 'error' },
        ],
      },
      {
        id: 'r2',
        title: 'Badge soft variant 색상 이슈',
        description: '고대비 모드에서 soft 배경색 접근성 미달. 색상 토큰 조정 필요.',
        priority: 'medium',
        assignees: [{ name: 'Frank Oh', color: 'primary' }],
        tags: [{ label: 'Bug', color: 'error' }],
      },
    ],
  },
  {
    id: 'done',
    title: '완료',
    indicator: 'bg-emerald-500',
    badgeColor: 'success',
    tasks: [
      {
        id: 'd1',
        title: 'Avatar 컴포넌트 구현',
        description: '이미지/이니셜 폴백, 그룹 오버랩 지원.',
        priority: 'medium',
        assignees: [
          { name: 'Alice Kim', color: 'primary' },
          { name: 'Carol Park', color: 'accent' },
        ],
        dueDate: '3월 20일',
        tags: [{ label: 'Dev', color: 'info' }],
      },
      {
        id: 'd2',
        title: 'Grid 레이아웃 컴포넌트',
        description: '12컬럼 그리드, gap/align/justify 지원.',
        priority: 'low',
        assignees: [{ name: 'Bob Lee', color: 'secondary' }],
        dueDate: '3월 18일',
        tags: [{ label: 'Dev', color: 'info' }],
      },
      {
        id: 'd3',
        title: 'CI/CD 파이프라인 구축',
        description: 'GitHub Actions 자동 배포. Storybook Preview PR 코멘트 자동화.',
        priority: 'high',
        assignees: [
          { name: 'Eve Jung', color: 'neutral' },
          { name: 'Frank Oh', color: 'primary' },
        ],
        dueDate: '3월 15일',
        tags: [
          { label: 'DevOps', color: 'secondary' },
          { label: '완료', color: 'success' },
        ],
      },
    ],
  },
]

type FilterType = '전체' | '내 태스크' | '높음 우선순위'

export default function KanbanBoard() {
  const [loading, setLoading] = useState(true)
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_COLUMNS)
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체')
  const [dragging, setDragging] = useState<{ taskId: string; fromColumnId: string } | null>(null)
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null)
  const [addingToColumnId, setAddingToColumnId] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const addInputRef = useRef<HTMLInputElement>(null)
  const nextTaskId = useRef(100)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (addingToColumnId) {
      setTimeout(() => addInputRef.current?.focus(), 50)
    }
  }, [addingToColumnId])

  const handleDragStart = (e: React.DragEvent, taskId: string, columnId: string) => {
    setDragging({ taskId, fromColumnId: columnId })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumnId(columnId)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.relatedTarget === null || !e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumnId(null)
    }
  }

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault()
    if (!dragging || dragging.fromColumnId === toColumnId) {
      setDragging(null)
      setDragOverColumnId(null)
      return
    }
    setColumns((prev) => {
      const task = prev.find((c) => c.id === dragging.fromColumnId)?.tasks.find((t) => t.id === dragging.taskId)
      if (!task) return prev
      return prev.map((col) => {
        if (col.id === dragging.fromColumnId) return { ...col, tasks: col.tasks.filter((t) => t.id !== dragging.taskId) }
        if (col.id === toColumnId) return { ...col, tasks: [task, ...col.tasks] }
        return col
      })
    })
    setDragging(null)
    setDragOverColumnId(null)
  }

  const handleDragEnd = () => {
    setDragging(null)
    setDragOverColumnId(null)
  }

  const handleAddTask = (columnId: string) => {
    if (!newTaskTitle.trim()) {
      setAddingToColumnId(null)
      return
    }
    const newTask: KanbanTask = {
      id: `new-${nextTaskId.current++}`,
      title: newTaskTitle.trim(),
      description: '새로 추가된 태스크입니다.',
      priority: 'medium',
      assignees: [{ name: '현진 이', color: 'primary' }],
      tags: [],
    }
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, tasks: [newTask, ...col.tasks] } : col))
    )
    setNewTaskTitle('')
    setAddingToColumnId(null)
  }

  const getFilteredTasks = (tasks: KanbanTask[]) => {
    if (activeFilter === '내 태스크') return tasks.filter((t) => t.assignees.some((a) => a.name.includes('현진')))
    if (activeFilter === '높음 우선순위') return tasks.filter((t) => t.priority === 'high')
    return tasks
  }

  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0)

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Stack direction="vertical" gap={1}>
          <Stack direction="horizontal" align="center" gap={2}>
            <Icon icon={KanbanSquare} size="md" color="primary" />
            <Typography variant="heading2">칸반 보드</Typography>
          </Stack>
          <Stack direction="horizontal" gap={2} align="center" className="flex-wrap">
            <Typography variant="body2" color="secondary">mongle-ui v0.2.0</Typography>
            <Badge color="info" variant="soft" size="sm">스프린트 3</Badge>
            <Badge color="neutral" variant="soft" size="sm">{loading ? '-' : totalTasks}개 태스크</Badge>
          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={2} align="center">
          <IconButton icon={Search} variant="outline" size="sm" />
          <IconButton icon={Filter} variant="outline" size="sm" />
          <Button
            variant="solid"
            color="primary"
            size="sm"
            leftIcon={<Icon icon={Plus} size="sm" />}
            onClick={() => { setAddingToColumnId('todo'); setNewTaskTitle('') }}
          >
            새 태스크
          </Button>
        </Stack>
      </div>

      {/* Filter chips */}
      <Stack direction="horizontal" gap={2} className="mb-6 flex-wrap">
        {(['전체', '내 태스크', '높음 우선순위'] as FilterType[]).map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)} className="focus:outline-none">
            <Badge
              color={activeFilter === f ? 'primary' : 'neutral'}
              variant={activeFilter === f ? 'solid' : 'soft'}
              size="sm"
              className="cursor-pointer"
            >
              {f}
            </Badge>
          </button>
        ))}
      </Stack>

      {/* Board */}
      <div className="overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8">
        <div className="flex gap-4 pb-6">
          {columns.map((column) => {
            const filteredTasks = getFilteredTasks(column.tasks)
            const isDragOver = dragOverColumnId === column.id && dragging?.fromColumnId !== column.id

            return (
              <div
                key={column.id}
                className={`flex-1 min-w-65 flex flex-col rounded-xl min-h-120 transition-colors duration-150 ${
                  isDragOver ? 'bg-blue-50 ring-2 ring-blue-200 ring-inset' : 'bg-gray-100/80'
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column header */}
                <div className="px-3 pt-3 pb-2">
                  <Stack direction="horizontal" align="center" justify="between">
                    <Stack direction="horizontal" align="center" gap={2}>
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${column.indicator}`} />
                      <Typography variant="subtitle2">{column.title}</Typography>
                      <Badge color={column.badgeColor} variant="soft" size="sm">
                        {loading ? '-' : filteredTasks.length}
                      </Badge>
                    </Stack>
                    <IconButton
                      icon={Plus}
                      variant="ghost"
                      size="sm"
                      onClick={() => { setAddingToColumnId(column.id); setNewTaskTitle('') }}
                    />
                  </Stack>
                </div>

                <Divider color="light" />

                {/* Cards */}
                <div className="flex-1 p-2">
                  <Stack direction="vertical" gap={2}>
                    {/* Inline add task form */}
                    <Transition in={addingToColumnId === column.id} type="collapse" unmountOnExit>
                      <Card variant="outlined">
                        <Card.Content className="p-2">
                          <Stack direction="vertical" gap={2}>
                            <input
                              ref={addingToColumnId === column.id ? addInputRef : undefined}
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddTask(column.id)
                                if (e.key === 'Escape') setAddingToColumnId(null)
                              }}
                              placeholder="태스크 제목 입력..."
                              className="w-full text-sm px-2 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            />
                            <Stack direction="horizontal" gap={1}>
                              <Button
                                size="sm"
                                variant="solid"
                                color="primary"
                                fullWidth
                                onClick={() => handleAddTask(column.id)}
                              >
                                추가
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                color="neutral"
                                fullWidth
                                onClick={() => setAddingToColumnId(null)}
                              >
                                취소
                              </Button>
                            </Stack>
                          </Stack>
                        </Card.Content>
                      </Card>
                    </Transition>

                    {/* Task cards */}
                    {loading
                      ? Array.from({
                          length: column.id === 'todo' ? 3 : column.id === 'inprogress' ? 2 : 1,
                        }).map((_, i) => <KanbanCard key={i} isLoading />)
                      : filteredTasks.map((task) => (
                          <KanbanCard
                            key={task.id}
                            task={task}
                            isDragging={dragging?.taskId === task.id}
                            onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                            onDragEnd={handleDragEnd}
                          />
                        ))}

                    {/* Empty state */}
                    {!loading && filteredTasks.length === 0 && addingToColumnId !== column.id && (
                      <div className="flex flex-col items-center justify-center py-10 gap-2">
                        <Typography variant="body2" color="disabled">태스크 없음</Typography>
                        <Button
                          variant="ghost"
                          size="sm"
                          color="primary"
                          leftIcon={<Icon icon={Plus} size="sm" />}
                          onClick={() => { setAddingToColumnId(column.id); setNewTaskTitle('') }}
                        >
                          추가
                        </Button>
                      </div>
                    )}
                  </Stack>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
