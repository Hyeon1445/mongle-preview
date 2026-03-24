import { useState } from 'react'
import {
  Avatar,
  Badge,
  Card,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Transition,
  Typography,
} from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'
import { MoreHorizontal } from 'lucide-react'
import ReactionBar from './ReactionBar'
import CommentItem from './CommentItem'
import type { CommentItemData } from './CommentItem'

/* ——— Post types ——— */
interface BasePost {
  id: number
  author: string
  avatarColor: AvatarColor
  role: string
  roleColor: Color
  time: string
  hashtags: string[]
  likes: number
  claps: number
  hots: number
  comments: CommentItemData[]
}

interface TextPost extends BasePost {
  type: 'text'
  content: string
}

interface ImagePost extends BasePost {
  type: 'image'
  content: string
  gradient: string
  imageLabel: string
}

interface CodePost extends BasePost {
  type: 'code'
  content: string
  code: string
  language: string
}

interface PollPost extends BasePost {
  type: 'poll'
  content: string
  options: { label: string; votes: number }[]
}

export type PostData = TextPost | ImagePost | CodePost | PollPost

/* ——— Skeleton ——— */
function PostCardSkeleton() {
  return (
    <Card variant="elevated">
      <Card.Header>
        <Stack direction="horizontal" align="center" justify="between">
          <Stack direction="horizontal" gap={3} align="center">
            <Skeleton variant="circular" className="w-10 h-10" />
            <Stack direction="vertical" gap={1}>
              <Skeleton variant="text" className="w-24 h-4" />
              <Skeleton variant="text" className="w-16 h-3" />
            </Stack>
          </Stack>
          <Skeleton variant="circular" className="w-6 h-6" />
        </Stack>
      </Card.Header>
      <Card.Content>
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-4/5 h-4 mt-1.5" />
        <Skeleton variant="text" className="w-2/3 h-4 mt-1.5" />
        <Skeleton variant="rectangular" className="w-full h-40 mt-4 rounded-xl" />
      </Card.Content>
      <Card.Footer>
        <Stack direction="horizontal" gap={2}>
          <Skeleton variant="rounded" className="w-20 h-8" />
          <Skeleton variant="rounded" className="w-20 h-8" />
          <Skeleton variant="rounded" className="w-20 h-8" />
        </Stack>
      </Card.Footer>
    </Card>
  )
}

/* ——— Poll voting ——— */
function PollContent({ options }: { options: { label: string; votes: number }[] }) {
  const [voted, setVoted] = useState<number | null>(null)
  const [counts, setCounts] = useState(options.map((o) => o.votes))
  const total = counts.reduce((a, b) => a + b, 0)

  const vote = (i: number) => {
    if (voted !== null) return
    setVoted(i)
    setCounts((prev) => prev.map((v, idx) => (idx === i ? v + 1 : v)))
  }

  return (
    <Stack direction="vertical" gap={2} className="mt-3">
      {options.map((opt, i) => {
        const pct = total > 0 ? Math.round((counts[i] / (total + (voted === null ? 0 : 0))) * 100) : 0
        return (
          <button
            key={opt.label}
            onClick={() => vote(i)}
            disabled={voted !== null}
            className={`
              w-full text-left rounded-xl border-2 overflow-hidden transition-all
              ${voted === i ? 'border-primary-400' : 'border-gray-200'}
              ${voted === null ? 'hover:border-primary-300 cursor-pointer' : 'cursor-default'}
            `}
          >
            <div className="relative px-4 py-2.5">
              {voted !== null && (
                <div
                  className={`absolute inset-0 transition-all duration-700 ${voted === i ? 'bg-primary-50' : 'bg-gray-50'}`}
                  style={{ width: `${pct}%` }}
                />
              )}
              <Stack direction="horizontal" align="center" justify="between" className="relative">
                <Typography variant="body2" className={voted === i ? 'font-semibold text-primary-700' : ''}>
                  {opt.label}
                </Typography>
                {voted !== null && (
                  <Typography variant="caption" color="secondary">{pct}%</Typography>
                )}
              </Stack>
            </div>
          </button>
        )
      })}
      <Typography variant="caption" color="disabled">
        {voted !== null ? `총 ${total + 1}명 참여` : `${total}명 참여 중 · 투표해보세요`}
      </Typography>
    </Stack>
  )
}

/* ——— Main PostCard ——— */
interface PostCardProps {
  isLoading?: boolean
  data?: PostData
}

export default function PostCard({ isLoading, data }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  if (isLoading) return <PostCardSkeleton />

  const post = data!

  return (
    <Card variant="elevated" className="transition-shadow duration-200 hover:shadow-md">
      <Card.Header>
        <Stack direction="horizontal" align="center" justify="between">
          <Stack direction="horizontal" gap={3} align="center">
            <Avatar name={post.author} color={post.avatarColor} size="md" />
            <Stack direction="vertical" gap={0.5}>
              <Stack direction="horizontal" gap={2} align="center">
                <Typography variant="subtitle2">{post.author}</Typography>
                <Badge color={post.roleColor} variant="soft" size="sm">{post.role}</Badge>
              </Stack>
              <Typography variant="caption" color="disabled">{post.time}</Typography>
            </Stack>
          </Stack>
          <IconButton icon={MoreHorizontal} variant="ghost" size="sm" />
        </Stack>
      </Card.Header>

      <Card.Content>
        <Typography variant="body2" color="secondary" className="leading-relaxed">
          {post.content}
        </Typography>

        {/* Hashtags */}
        {post.hashtags.length > 0 && (
          <Stack direction="horizontal" gap={1.5} wrap className="mt-2">
            {post.hashtags.map((tag) => (
              <Badge key={tag} color="info" variant="soft" size="sm">#{tag}</Badge>
            ))}
          </Stack>
        )}

        {/* Image post */}
        {post.type === 'image' && (
          <div
            className="mt-3 rounded-xl h-48 flex items-center justify-center"
            style={{ background: post.gradient }}
          >
            <Typography variant="subtitle1" className="text-white/80">{post.imageLabel}</Typography>
          </div>
        )}

        {/* Code post */}
        {post.type === 'code' && (
          <div className="mt-3 rounded-xl bg-gray-900 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <Typography variant="caption" className="ml-2 text-gray-400">{post.language}</Typography>
            </div>
            <pre className="px-4 py-3 text-xs text-green-300 overflow-x-auto scrollbar-hide leading-relaxed">
              <code>{post.code}</code>
            </pre>
          </div>
        )}

        {/* Poll post */}
        {post.type === 'poll' && <PollContent options={post.options} />}
      </Card.Content>

      <Divider color="light" />

      <Card.Footer>
        <ReactionBar
          initialLikes={post.likes}
          initialClaps={post.claps}
          initialHots={post.hots}
          commentCount={post.comments.length}
          onCommentToggle={() => setShowComments((v) => !v)}
        />
      </Card.Footer>

      {/* Comments section */}
      <Transition in={showComments} type="collapse" unmountOnExit>
        <div className="px-5 pb-4">
          <Divider color="light" className="mb-3" />
          <Stack direction="vertical" gap={0}>
            {post.comments.map((c, i) => (
              <CommentItem key={i} data={c} last={i === post.comments.length - 1} />
            ))}
          </Stack>
          <div className="mt-3">
            <TextField
              placeholder="댓글을 입력하세요..."
              size="sm"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
        </div>
      </Transition>
    </Card>
  )
}
