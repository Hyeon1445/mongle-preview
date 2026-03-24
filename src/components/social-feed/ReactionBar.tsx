import { useState } from 'react'
import { Button, Icon, Stack } from 'mongle-ui'
import { MessageCircle, Share2 } from 'lucide-react'

interface ReactionBarProps {
  initialLikes?: number
  initialClaps?: number
  initialHots?: number
  commentCount?: number
  onCommentToggle?: () => void
}

type ReactionKey = 'like' | 'clap' | 'hot'

const REACTIONS: { key: ReactionKey; emoji: string; label: string }[] = [
  { key: 'like', emoji: '❤️', label: '좋아요' },
  { key: 'clap', emoji: '👏', label: '클랩' },
  { key: 'hot', emoji: '🔥', label: '핫' },
]

export default function ReactionBar({
  initialLikes = 0,
  initialClaps = 0,
  initialHots = 0,
  commentCount = 0,
  onCommentToggle,
}: ReactionBarProps) {
  const [counts, setCounts] = useState<Record<ReactionKey, number>>({
    like: initialLikes,
    clap: initialClaps,
    hot: initialHots,
  })
  const [active, setActive] = useState<Record<ReactionKey, boolean>>({
    like: false,
    clap: false,
    hot: false,
  })
  const [popping, setPopping] = useState<Record<ReactionKey, boolean>>({
    like: false,
    clap: false,
    hot: false,
  })

  const handleReaction = (key: ReactionKey) => {
    setActive((prev) => {
      const next = !prev[key]
      setCounts((c) => ({ ...c, [key]: c[key] + (next ? 1 : -1) }))
      return { ...prev, [key]: next }
    })
    setPopping((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => setPopping((prev) => ({ ...prev, [key]: false })), 300)
  }

  return (
    <Stack direction="horizontal" align="center" justify="between">
      <Stack direction="horizontal" gap={1} align="center">
        {REACTIONS.map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => handleReaction(key)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              transition-all duration-150 cursor-pointer select-none
              ${popping[key] ? 'animate-reaction-pop' : ''}
              ${active[key]
                ? 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <span className="text-base leading-none">{emoji}</span>
            {counts[key] > 0 && (
              <span className="tabular-nums">{counts[key]}</span>
            )}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </Stack>

      <Stack direction="horizontal" gap={2} align="center">
        <button
          onClick={onCommentToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer select-none"
        >
          <Icon icon={MessageCircle} size="sm" />
          {commentCount > 0 && <span className="tabular-nums">{commentCount}</span>}
          <span className="hidden sm:inline">댓글</span>
        </button>
        <Button variant="ghost" size="sm" color="neutral" leftIcon={<Icon icon={Share2} size="sm" />}>
          <span className="hidden sm:inline">공유</span>
        </Button>
      </Stack>
    </Stack>
  )
}
