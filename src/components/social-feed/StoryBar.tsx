import { Avatar, Skeleton, Typography } from 'mongle-ui'
import type { AvatarColor } from 'mongle-ui'
import { Plus } from 'lucide-react'

interface StoryItem {
  name: string
  avatarColor: AvatarColor
  seen: boolean
}

const stories: StoryItem[] = [
  { name: 'Alice Kim', avatarColor: 'primary', seen: false },
  { name: 'Bob Lee', avatarColor: 'secondary', seen: false },
  { name: 'Carol Park', avatarColor: 'accent', seen: true },
  { name: 'Dave Choi', avatarColor: 'warm', seen: false },
  { name: 'Eve Jung', avatarColor: 'neutral', seen: true },
  { name: 'Frank Oh', avatarColor: 'primary', seen: false },
]

interface StoryBarProps {
  isLoading?: boolean
}

export default function StoryBar({ isLoading }: StoryBarProps) {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
            <Skeleton variant="circular" className="w-14 h-14" />
            <Skeleton variant="text" className="w-10 h-3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
      {/* Add story */}
      <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
        <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-primary-400 transition-colors">
          <Plus size={20} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>
        <Typography variant="caption" color="secondary" className="text-center w-14 truncate">
          내 스토리
        </Typography>
      </div>

      {stories.map((story) => (
        <div key={story.name} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
          {/* Outer ring */}
          <div
            style={{
              padding: 2.5,
              borderRadius: '9999px',
              background: story.seen
                ? '#d1d5db'
                : 'conic-gradient(from 0deg, #a855f7, #ec4899, #f97316, #a855f7)',
            }}
          >
            {/* White gap */}
            <div style={{ padding: 2, borderRadius: '9999px', background: 'white' }}>
              <Avatar name={story.name} color={story.avatarColor} size="lg" />
            </div>
          </div>
          <Typography variant="caption" color="secondary" className="text-center w-14 truncate">
            {story.name.split(' ')[0]}
          </Typography>
        </div>
      ))}
    </div>
  )
}
