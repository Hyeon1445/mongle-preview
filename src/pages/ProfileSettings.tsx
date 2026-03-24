import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Divider,
  Icon,
  NumberField,
  Paper,
  PasswordField,
  ProgressBar,
  Skeleton,
  Stack,
  TextField,
  Transition,
  Typography,
} from 'mongle-ui'
import type { AvatarColor, Color } from 'mongle-ui'
import { Bell, Camera, Check, Lock, Shield, User } from 'lucide-react'

type Tab = 'profile' | 'notifications' | 'security'

type ProfileForm = {
  name: string
  email: string
  role: string
  bio: string
  website: string
  yearsOfExp: number
}

type SecurityForm = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: '프로필', icon: User },
  { id: 'notifications', label: '알림', icon: Bell },
  { id: 'security', label: '보안', icon: Shield },
]

const teamMembers: { name: string; color: AvatarColor }[] = [
  { name: 'Bob Lee', color: 'secondary' },
  { name: 'Carol Park', color: 'accent' },
  { name: 'Dave Choi', color: 'warm' },
  { name: 'Eve Jung', color: 'neutral' },
]

type NotifItem = {
  id: string
  label: string
  desc: string
  badge?: { label: string; color: Color }
}

const notifItems: NotifItem[] = [
  { id: 'mentions', label: '멘션 알림', desc: '누군가 나를 멘션했을 때', badge: { label: '3', color: 'error' } },
  { id: 'comments', label: '댓글 알림', desc: '내 게시글에 댓글이 달렸을 때', badge: { label: '12', color: 'info' } },
  { id: 'pr', label: 'PR 리뷰 요청', desc: '코드 리뷰 요청이 들어왔을 때' },
  { id: 'sprint', label: '스프린트 업데이트', desc: '스프린트 상태 변경 시' },
  { id: 'deploy', label: '배포 알림', desc: 'CI/CD 배포 결과' },
]

const notifStats: { label: string; value: number; max: number; color: Color }[] = [
  { label: '멘션', value: 24, max: 50, color: 'error' },
  { label: '댓글', value: 89, max: 100, color: 'info' },
  { label: 'PR 리뷰', value: 31, max: 50, color: 'success' },
]

const securityStatus: { label: string; value: string; badge: { label: string; color: Color } }[] = [
  { label: '마지막 로그인', value: '2026년 3월 25일 오전 10:32', badge: { label: '정상', color: 'success' } },
  { label: '2단계 인증', value: '미설정', badge: { label: '권장', color: 'warning' } },
  { label: '활성 세션', value: '2개 기기', badge: { label: '확인', color: 'info' } },
]

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [profileSaved, setProfileSaved] = useState(false)
  const [securitySaved, setSecuritySaved] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState<Record<string, boolean>>({
    mentions: true,
    comments: true,
    pr: true,
    sprint: false,
    deploy: false,
  })

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const {
    register: regProfile,
    handleSubmit: handleProfile,
    formState: { errors: profileErr },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: '현진 이',
      email: 'hyeonjin@mongle.io',
      role: '관리자',
      bio: 'mongle-ui를 만들고 있어요. 디자인 시스템과 컴포넌트 라이브러리에 관심이 많습니다.',
      website: 'https://hyeon1445.github.io/mongle-ui',
      yearsOfExp: 3,
    },
  })

  const {
    register: regSecurity,
    handleSubmit: handleSecurity,
    getValues,
    formState: { errors: securityErr },
    reset: resetSecurity,
  } = useForm<SecurityForm>()

  const onProfileSubmit = () => {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const onSecuritySubmit = () => {
    setSecuritySaved(true)
    resetSecurity()
    setTimeout(() => setSecuritySaved(false), 2500)
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Stack direction="vertical" gap={6}>

          {/* Header */}
          <Stack direction="vertical" gap={1}>
            <Typography variant="heading2">설정</Typography>
            <Typography variant="body2" color="secondary">
              프로필, 알림, 보안 설정을 관리하세요
            </Typography>
          </Stack>

          {/* Profile card */}
          <Card variant="elevated">
            <Card.Content>
              {loading ? (
                <Stack direction="horizontal" gap={4} align="center">
                  <Skeleton variant="circular" className="w-16 h-16 shrink-0" />
                  <Stack direction="vertical" gap={2} className="flex-1">
                    <Skeleton variant="text" className="w-28 h-5" />
                    <Skeleton variant="text" className="w-40 h-4" />
                    <Skeleton variant="rounded" className="w-32 h-4" />
                  </Stack>
                </Stack>
              ) : (
                <Stack direction="horizontal" gap={4} align="center" className="flex-wrap">
                  <div className="relative shrink-0">
                    <Avatar name="현진 이" color="primary" size="lg" />
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shadow cursor-pointer hover:bg-primary-600 transition-colors"
                    >
                      <Icon icon={Camera} size="sm" className="text-white" />
                    </button>
                  </div>
                  <Stack direction="vertical" gap={1} className="flex-1 min-w-0">
                    <Stack direction="horizontal" align="center" gap={2} className="flex-wrap">
                      <Typography variant="heading4">현진 이</Typography>
                      <Badge color="primary" variant="soft" size="sm">관리자</Badge>
                      <Badge color="success" variant="soft" size="sm">온라인</Badge>
                    </Stack>
                    <Typography variant="body2" color="secondary">hyeonjin@mongle.io</Typography>
                    <Stack direction="horizontal" align="center" gap={2}>
                      <Typography variant="caption" color="secondary">팀원</Typography>
                      <AvatarGroup max={4} size="sm">
                        {teamMembers.map((m) => (
                          <Avatar key={m.name} name={m.name} color={m.color} />
                        ))}
                      </AvatarGroup>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Card.Content>
          </Card>

          {/* Tabs */}
          <Paper elevation={1} radius="xl" className="p-1.5">
            <Stack direction="horizontal" gap={1}>
              {tabs.map(({ id, label, icon }) => (
                <Button
                  key={id}
                  variant={activeTab === id ? 'soft' : 'ghost'}
                  color={activeTab === id ? 'primary' : 'neutral'}
                  size="sm"
                  leftIcon={<Icon icon={icon} size="sm" />}
                  onClick={() => setActiveTab(id)}
                  className="flex-1"
                >
                  {label}
                </Button>
              ))}
            </Stack>
          </Paper>

          {/* Tab: 프로필 */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfile(onProfileSubmit)}>
              <Stack direction="vertical" gap={4}>
                <Card variant="elevated">
                  <Card.Header>
                    <Stack direction="horizontal" align="center" gap={2}>
                      <Icon icon={User} size="sm" />
                      <Typography variant="subtitle1">기본 정보</Typography>
                    </Stack>
                  </Card.Header>
                  <Card.Content>
                    <Stack direction="vertical" gap={4}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField
                          label="이름"
                          description="공개 프로필에 표시됩니다"
                          fullWidth
                          {...regProfile('name', { required: '이름을 입력해주세요' })}
                          error={profileErr.name?.message}
                        />
                        <TextField
                          label="이메일"
                          description="로그인 및 알림에 사용됩니다"
                          fullWidth
                          {...regProfile('email', {
                            required: '이메일을 입력해주세요',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: '올바른 이메일 형식이 아닙니다',
                            },
                          })}
                          error={profileErr.email?.message}
                        />
                      </div>
                      <TextField
                        label="직책"
                        description="팀 내 역할을 입력해주세요"
                        fullWidth
                        {...regProfile('role')}
                      />
                      <TextField
                        label="소개"
                        description="간단한 자기소개를 작성해주세요 (최대 200자)"
                        fullWidth
                        {...regProfile('bio', {
                          maxLength: { value: 200, message: '최대 200자까지 입력할 수 있습니다' },
                        })}
                        error={profileErr.bio?.message}
                      />
                    </Stack>
                  </Card.Content>
                </Card>

                <Card variant="outlined">
                  <Card.Header>
                    <Typography variant="subtitle1">추가 정보</Typography>
                  </Card.Header>
                  <Card.Content>
                    <Stack direction="vertical" gap={4}>
                      <TextField
                        label="웹사이트"
                        description="포트폴리오나 블로그 주소를 입력해주세요"
                        placeholder="https://"
                        fullWidth
                        {...regProfile('website')}
                      />
                      <NumberField
                        label="경력 (년)"
                        description="개발 경력을 입력해주세요"
                        min={0}
                        max={50}
                        step={1}
                        fullWidth
                        {...regProfile('yearsOfExp', { valueAsNumber: true })}
                      />
                    </Stack>
                  </Card.Content>
                </Card>

                <Stack direction="horizontal" justify="end" align="center" gap={3}>
                  <Transition in={profileSaved} type="fade" unmountOnExit>
                    <Stack direction="horizontal" align="center" gap={1}>
                      <Icon icon={Check} size="sm" color="success" />
                      <Typography variant="body2" color="secondary">저장되었습니다</Typography>
                    </Stack>
                  </Transition>
                  <Button variant="outline" color="neutral" type="button">취소</Button>
                  <Button variant="solid" color="primary" type="submit">변경사항 저장</Button>
                </Stack>
              </Stack>
            </form>
          )}

          {/* Tab: 알림 */}
          {activeTab === 'notifications' && (
            <Stack direction="vertical" gap={4}>
              <Card variant="elevated">
                <Card.Header>
                  <Stack direction="horizontal" align="center" justify="between">
                    <Stack direction="horizontal" align="center" gap={2}>
                      <Icon icon={Bell} size="sm" />
                      <Typography variant="subtitle1">알림 설정</Typography>
                    </Stack>
                    <Badge color="error" size="sm">15</Badge>
                  </Stack>
                </Card.Header>
                <Card.Content>
                  <Stack direction="vertical" gap={0}>
                    {notifItems.map((item, i) => (
                      <div key={item.id}>
                        <Stack direction="horizontal" align="center" justify="between" className="py-3">
                          <Stack direction="vertical" gap={0} className="flex-1 min-w-0 mr-4">
                            <Stack direction="horizontal" align="center" gap={2}>
                              <Typography variant="subtitle2">{item.label}</Typography>
                              {item.badge && (
                                <Badge color={item.badge.color} size="sm">{item.badge.label}</Badge>
                              )}
                            </Stack>
                            <Typography variant="caption" color="secondary">{item.desc}</Typography>
                          </Stack>
                          <Button
                            variant={notifEnabled[item.id] ? 'soft' : 'outline'}
                            color={notifEnabled[item.id] ? 'primary' : 'neutral'}
                            size="sm"
                            onClick={() =>
                              setNotifEnabled((p) => ({ ...p, [item.id]: !p[item.id] }))
                            }
                          >
                            {notifEnabled[item.id] ? '켜짐' : '꺼짐'}
                          </Button>
                        </Stack>
                        {i < notifItems.length - 1 && <Divider color="light" />}
                      </div>
                    ))}
                  </Stack>
                </Card.Content>
              </Card>

              <Card variant="outlined">
                <Card.Header>
                  <Typography variant="subtitle1">이번 달 알림 현황</Typography>
                </Card.Header>
                <Card.Content>
                  <Stack direction="vertical" gap={3}>
                    {notifStats.map(({ label, value, max, color }) => (
                      <div key={label}>
                        <Stack direction="horizontal" justify="between" className="mb-1">
                          <Typography variant="caption" color="secondary">{label}</Typography>
                          <Typography variant="caption" color="secondary">
                            {value} / {max}
                          </Typography>
                        </Stack>
                        <ProgressBar value={(value / max) * 100} color={color} size="sm" />
                      </div>
                    ))}
                  </Stack>
                </Card.Content>
              </Card>
            </Stack>
          )}

          {/* Tab: 보안 */}
          {activeTab === 'security' && (
            <form onSubmit={handleSecurity(onSecuritySubmit)}>
              <Stack direction="vertical" gap={4}>
                <Card variant="elevated">
                  <Card.Header>
                    <Stack direction="horizontal" align="center" gap={2}>
                      <Icon icon={Lock} size="sm" />
                      <Typography variant="subtitle1">비밀번호 변경</Typography>
                    </Stack>
                  </Card.Header>
                  <Card.Content>
                    <Stack direction="vertical" gap={4}>
                      <PasswordField
                        label="현재 비밀번호"
                        description="계정 보호를 위해 현재 비밀번호를 먼저 입력해주세요"
                        fullWidth
                        {...regSecurity('currentPassword', { required: '현재 비밀번호를 입력해주세요' })}
                        error={securityErr.currentPassword?.message}
                      />
                      <PasswordField
                        label="새 비밀번호"
                        description="영문, 숫자, 특수문자 포함 8자 이상"
                        fullWidth
                        {...regSecurity('newPassword', {
                          required: '새 비밀번호를 입력해주세요',
                          minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다' },
                        })}
                        error={securityErr.newPassword?.message}
                      />
                      <PasswordField
                        label="새 비밀번호 확인"
                        fullWidth
                        {...regSecurity('confirmPassword', {
                          required: '비밀번호 확인을 입력해주세요',
                          validate: (v) => v === getValues('newPassword') || '비밀번호가 일치하지 않습니다',
                        })}
                        error={securityErr.confirmPassword?.message}
                      />
                    </Stack>
                  </Card.Content>
                </Card>

                <Card variant="outlined">
                  <Card.Header>
                    <Stack direction="horizontal" align="center" gap={2}>
                      <Icon icon={Shield} size="sm" />
                      <Typography variant="subtitle1">보안 현황</Typography>
                    </Stack>
                  </Card.Header>
                  <Card.Content>
                    <Stack direction="vertical" gap={0}>
                      {securityStatus.map(({ label, value, badge }, i, arr) => (
                        <div key={label}>
                          <Stack
                            direction="horizontal"
                            align="center"
                            justify="between"
                            className="py-3"
                          >
                            <Stack direction="vertical" gap={0}>
                              <Typography variant="caption" color="secondary">{label}</Typography>
                              <Typography variant="subtitle2">{value}</Typography>
                            </Stack>
                            <Badge color={badge.color} variant="soft" size="sm">{badge.label}</Badge>
                          </Stack>
                          {i < arr.length - 1 && <Divider color="light" />}
                        </div>
                      ))}
                    </Stack>
                  </Card.Content>
                </Card>

                <Stack direction="horizontal" justify="end" align="center" gap={3}>
                  <Transition in={securitySaved} type="fade" unmountOnExit>
                    <Stack direction="horizontal" align="center" gap={1}>
                      <Icon icon={Check} size="sm" color="success" />
                      <Typography variant="body2" color="secondary">비밀번호가 변경되었습니다</Typography>
                    </Stack>
                  </Transition>
                  <Button variant="solid" color="primary" type="submit">비밀번호 변경</Button>
                </Stack>
              </Stack>
            </form>
          )}

        </Stack>
      </div>
    </div>
  )
}
