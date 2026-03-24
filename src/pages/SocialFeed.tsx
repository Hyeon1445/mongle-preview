import { useEffect, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Icon,
  Paper,
  ProgressBar,
  Skeleton,
  Stack,
  Typography,
} from 'mongle-ui'
import { Bell, Flame, LayoutList, Users } from 'lucide-react'
import StoryBar from '../components/social-feed/StoryBar'
import PostCard from '../components/social-feed/PostCard'
import type { PostData } from '../components/social-feed/PostCard'
import PostComposer from '../components/social-feed/PostComposer'
import TrendingTag from '../components/social-feed/TrendingTag'
import type { TrendingTagData } from '../components/social-feed/TrendingTag'
import SuggestedMember from '../components/social-feed/SuggestedMember'
import type { SuggestedMemberData } from '../components/social-feed/SuggestedMember'

/* ——— Data ——— */
const posts: PostData[] = [
  {
    id: 1,
    type: 'text',
    author: 'Carol Park',
    avatarColor: 'accent',
    role: 'Design',
    roleColor: 'secondary',
    time: '5분 전',
    content:
      'mongle-ui v0.2.0 디자인 시스템 색상 토큰 정리 완료했어요! 기존에 의미가 불분명했던 색상들을 semantic 네이밍으로 전환했고, primary / secondary / accent 계열로 명확하게 분류했습니다. Figma 컴포넌트 파일도 동기화 완료 🎨',
    hashtags: ['디자인시스템', '색상토큰', 'Figma'],
    likes: 14,
    claps: 8,
    hots: 5,
    comments: [
      { user: 'Alice Kim', avatarColor: 'primary', text: '드디어!! 기다리고 있었어요 ㅎㅎ 수고하셨습니다', time: '3분 전' },
      { user: 'Bob Lee', avatarColor: 'secondary', text: '문서도 업데이트 되나요? Storybook에 반영하면 좋을 것 같아요', time: '2분 전' },
    ],
  },
  {
    id: 2,
    type: 'image',
    author: 'Alice Kim',
    avatarColor: 'primary',
    role: 'Dev',
    roleColor: 'info',
    time: '1시간 전',
    content: 'Button 컴포넌트 ripple 효과 드디어 붙였습니다. 클릭할 때 퍼지는 효과가 mongle-ui 특유의 감성에 잘 맞는 것 같아요. PR #42 확인해주세요!',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    imageLabel: '✨ Button Ripple Effect',
    hashtags: ['mongleUI', 'PR리뷰요청'],
    likes: 22,
    claps: 17,
    hots: 9,
    comments: [
      { user: 'Carol Park', avatarColor: 'accent', text: '오 예쁘다! 디자인 피드백 드릴게요', time: '50분 전' },
      { user: 'Dave Choi', avatarColor: 'warm', text: 'QA 해볼게요. 어떤 브라우저 기준으로 테스트했어요?', time: '45분 전' },
    ],
  },
  {
    id: 3,
    type: 'code',
    author: 'Eve Jung',
    avatarColor: 'neutral',
    role: 'Dev',
    roleColor: 'info',
    time: '2시간 전',
    content: 'Storybook 배포 자동화 완료! GitHub Actions에서 main 브랜치 push 시 자동 빌드 → GitHub Pages 배포까지 연결했어요. 핵심 workflow 공유합니다.',
    code: `name: Deploy Storybook
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static`,
    language: 'deploy.yml',
    hashtags: ['GitHub Actions', 'CI/CD', 'Storybook'],
    likes: 31,
    claps: 25,
    hots: 12,
    comments: [
      { user: 'Bob Lee', avatarColor: 'secondary', text: 'cache 설정도 넣으면 속도 더 빨라질 거예요!', time: '1시간 전' },
    ],
  },
  {
    id: 4,
    type: 'poll',
    author: 'Bob Lee',
    avatarColor: 'secondary',
    role: 'PM',
    roleColor: 'warning',
    time: '3시간 전',
    content: '스프린트 4 킥오프 날짜 정해봐요! 다들 어떤 날이 좋으신가요?',
    options: [
      { label: '3월 31일 (월) 오전 10시', votes: 5 },
      { label: '4월 1일 (화) 오후 2시', votes: 3 },
      { label: '4월 2일 (수) 오전 11시', votes: 7 },
    ],
    hashtags: ['스프린트4', '일정투표'],
    likes: 6,
    claps: 2,
    hots: 0,
    comments: [
      { user: 'Frank Oh', avatarColor: 'primary', text: '저는 수요일이 제일 좋아요!', time: '2시간 전' },
      { user: 'Carol Park', avatarColor: 'accent', text: '수요일 +1요', time: '1시간 전' },
      { user: 'Dave Choi', avatarColor: 'warm', text: '월요일은 다른 미팅이 있어서 화요일 또는 수요일이 좋아요', time: '30분 전' },
    ],
  },
]

const trendingTags: TrendingTagData[] = [
  { tag: 'mongleUI', count: 128, rising: true },
  { tag: '디자인시스템', count: 94, rising: true },
  { tag: 'Storybook', count: 67, rising: false },
  { tag: 'CI/CD', count: 45, rising: false },
  { tag: '스프린트4', count: 23, rising: true },
]

const suggestedMembers: SuggestedMemberData[] = [
  { name: 'Dave Choi', role: 'QA', roleColor: 'success', avatarColor: 'warm', mutualCount: 8 },
  { name: 'Frank Oh', role: 'Dev', roleColor: 'info', avatarColor: 'primary', mutualCount: 5 },
  { name: 'Grace Han', role: 'Design', roleColor: 'secondary', avatarColor: 'accent', mutualCount: 3 },
]

const onlineMembers = [
  { name: 'Alice Kim', color: 'primary' as const },
  { name: 'Carol Park', color: 'accent' as const },
  { name: 'Eve Jung', color: 'neutral' as const },
]

const activityStats = [
  { label: '이번 주 게시글', value: '47', color: 'info' as const },
  { label: '총 반응', value: '312', color: 'success' as const },
  { label: '댓글', value: '89', color: 'warning' as const },
]

type FeedFilter = 'all' | 'following' | 'trending'

/* ——— Page ——— */
export default function SocialFeed() {
  const [loading, setLoading] = useState(true)
  const [feedFilter, setFeedFilter] = useState<FeedFilter>('all')
  const [localPosts, setLocalPosts] = useState(posts)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  const handlePost = (text: string) => {
    const newPost: PostData = {
      id: Date.now(),
      type: 'text',
      author: '현진 이',
      avatarColor: 'primary',
      role: 'Admin',
      roleColor: 'primary',
      time: '방금',
      content: text,
      hashtags: [],
      likes: 0,
      claps: 0,
      hots: 0,
      comments: [],
    }
    setLocalPosts((prev) => [newPost, ...prev])
  }

  const filterButtons: { id: FeedFilter; label: string; icon: typeof LayoutList }[] = [
    { id: 'all', label: '전체', icon: LayoutList },
    { id: 'following', label: '팔로잉', icon: Users },
    { id: 'trending', label: '트렌딩', icon: Flame },
  ]

  return (
    <div className="flex h-full overflow-auto">
      <div className="flex w-full mx-auto gap-6 p-6" style={{ maxWidth: 1280 }}>

        {/* ——— Left Sidebar ——— */}
        <aside className="hidden lg:flex flex-col gap-4 w-56 shrink-0">
          {/* Feed filter */}
          <Paper elevation={1} radius="xl" className="p-3">
            <Stack direction="vertical" gap={1}>
              <Typography variant="overline" color="secondary" className="px-2 pb-1">
                피드 필터
              </Typography>
              {filterButtons.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setFeedFilter(id)}
                  className={`
                    flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 cursor-pointer text-left
                    ${feedFilter === id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon icon={icon} size="sm" />
                  {label}
                  {id === 'trending' && (
                    <Badge color="error" size="sm" className="ml-auto">hot</Badge>
                  )}
                </button>
              ))}
            </Stack>
          </Paper>

          {/* Trending tags */}
          <Paper elevation={1} radius="xl" className="p-3">
            <Typography variant="overline" color="secondary" className="px-2 pb-2 block">
              트렌딩 태그
            </Typography>
            <Stack direction="vertical" gap={0}>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <TrendingTag key={i} isLoading />)
                : trendingTags.map((tag) => <TrendingTag key={tag.tag} data={tag} />)
              }
            </Stack>
          </Paper>

          {/* Team participation */}
          <Paper elevation={1} radius="xl" className="p-3">
            <Typography variant="overline" color="secondary" className="px-2 pb-2 block">
              팀 참여도
            </Typography>
            <Stack direction="vertical" gap={3} className="px-2">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                      <Stack direction="horizontal" justify="between" className="mb-1">
                        <Skeleton variant="text" className="w-20 h-3.5" />
                        <Skeleton variant="text" className="w-8 h-3.5" />
                      </Stack>
                      <Skeleton variant="rounded" className="w-full h-1.5" />
                    </div>
                  ))
                : activityStats.map(({ label, value, color }) => (
                    <div key={label}>
                      <Stack direction="horizontal" justify="between" className="mb-1">
                        <Typography variant="caption" color="secondary">{label}</Typography>
                        <Typography variant="caption" color="secondary">{value}</Typography>
                      </Stack>
                      <ProgressBar
                        value={Math.min((parseInt(value) / 500) * 100, 100)}
                        size="sm"
                        color={color}
                      />
                    </div>
                  ))
              }
            </Stack>
          </Paper>
        </aside>

        {/* ——— Center Feed ——— */}
        <main className="flex-1 min-w-0 flex flex-col gap-4" style={{ paddingBottom: 48 }}>
          {/* Header */}
          <Stack direction="horizontal" align="center" justify="between">
            <Stack direction="vertical" gap={1}>
              <Typography variant="heading3">소셜 피드</Typography>
              <Typography variant="body2" color="secondary">팀의 최신 소식과 활동을 확인하세요</Typography>
            </Stack>
            <Button variant="outline" size="sm" leftIcon={<Icon icon={Bell} size="sm" />}>
              알림 설정
            </Button>
          </Stack>

          {/* Stories */}
          <Paper elevation={1} radius="xl" className="p-4">
            <StoryBar isLoading={loading} />
          </Paper>

          {/* Composer */}
          <PostComposer onPost={handlePost} />

          {/* Feed filter pills (mobile) */}
          <div className="flex gap-2 lg:hidden overflow-x-auto scrollbar-hide">
            {filterButtons.map(({ id, label }) => (
              <Button
                key={id}
                variant={feedFilter === id ? 'soft' : 'ghost'}
                color={feedFilter === id ? 'primary' : 'neutral'}
                size="sm"
                onClick={() => setFeedFilter(id)}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Posts */}
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <PostCard key={i} isLoading />)
            : localPosts.map((post) => <PostCard key={post.id} data={post} />)
          }
        </main>

        {/* ——— Right Sidebar ——— */}
        <aside className="hidden sm:flex flex-col gap-4 w-72 shrink-0">
          {/* Online now */}
          <Card variant="elevated">
            <Card.Header>
              <Stack direction="horizontal" align="center" justify="between">
                <Typography variant="subtitle1">지금 온라인</Typography>
                <Badge color="success" variant="soft" size="sm">3명</Badge>
              </Stack>
            </Card.Header>
            <Card.Content>
              {loading ? (
                <Stack direction="horizontal" gap={2}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Stack key={i} direction="vertical" gap={1} align="center">
                      <Skeleton variant="circular" className="w-10 h-10" />
                      <Skeleton variant="text" className="w-10 h-3" />
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Stack direction="horizontal" gap={3}>
                  {onlineMembers.map((m) => (
                    <Stack key={m.name} direction="vertical" gap={1} align="center">
                      <div className="relative">
                        <Avatar name={m.name} color={m.color} size="md" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                      </div>
                      <Typography variant="caption" color="secondary" className="text-center">
                        {m.name.split(' ')[0]}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Card.Content>
          </Card>

          {/* Suggested members */}
          <Card variant="elevated">
            <Card.Header>
              <Stack direction="horizontal" align="center" justify="between">
                <Typography variant="subtitle1">팔로우 추천</Typography>
                <Button variant="ghost" size="sm" color="primary">전체 보기</Button>
              </Stack>
            </Card.Header>
            <Card.Content>
              <Stack direction="vertical" gap={0}>
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i}>
                        <SuggestedMember isLoading />
                        {i < 2 && <Divider color="light" />}
                      </div>
                    ))
                  : suggestedMembers.map((m, i) => (
                      <div key={m.name}>
                        <SuggestedMember data={m} />
                        {i < suggestedMembers.length - 1 && <Divider color="light" />}
                      </div>
                    ))
                }
              </Stack>
            </Card.Content>
          </Card>

          {/* Weekly highlights */}
          <Card variant="filled">
            <Card.Header>
              <Stack direction="horizontal" align="center" gap={2}>
                <Typography variant="subtitle1">이번 주 하이라이트</Typography>
                <Badge color="warning" variant="soft" size="sm">🏆 Top</Badge>
              </Stack>
            </Card.Header>
            <Card.Content>
              {loading ? (
                <Stack direction="vertical" gap={3}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Stack key={i} direction="horizontal" align="center" gap={2}>
                      <Skeleton variant="circular" className="w-8 h-8" />
                      <Stack direction="vertical" gap={1} className="flex-1">
                        <Skeleton variant="text" className="w-20 h-3.5" />
                        <Skeleton variant="text" className="w-28 h-3" />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Stack direction="vertical" gap={3}>
                  {[
                    { name: 'Alice Kim', color: 'primary' as const, desc: '게시글 반응 1위 · 36 reactions', medal: '🥇' },
                    { name: 'Carol Park', color: 'accent' as const, desc: '가장 많은 팔로워 증가', medal: '🥈' },
                    { name: 'Eve Jung', color: 'neutral' as const, desc: '커밋 + 게시글 활동 1위', medal: '🥉' },
                  ].map(({ name, color, desc, medal }) => (
                    <Stack key={name} direction="horizontal" align="center" gap={2}>
                      <div className="relative">
                        <Avatar name={name} color={color} size="sm" />
                        <span className="absolute -top-1 -right-1 text-xs">{medal}</span>
                      </div>
                      <Stack direction="vertical" gap={0} className="flex-1 min-w-0">
                        <Typography variant="subtitle2" ellipsis>{name}</Typography>
                        <Typography variant="caption" color="secondary" ellipsis>{desc}</Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Card.Content>
          </Card>
        </aside>

      </div>
    </div>
  )
}
