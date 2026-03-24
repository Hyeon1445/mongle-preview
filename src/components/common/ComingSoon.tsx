import { useNavigate } from 'react-router-dom'
import { Button, Spinner, Stack, Typography } from 'mongle-ui'

export default function ComingSoon() {
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
