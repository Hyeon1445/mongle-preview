import { useState } from 'react'
import { Avatar, Button, Card, Divider, IconButton, Stack, TextField } from 'mongle-ui'
import { AtSign, Hash, ImageIcon, Smile } from 'lucide-react'

interface PostComposerProps {
  onPost?: (text: string) => void
}

export default function PostComposer({ onPost }: PostComposerProps) {
  const [value, setValue] = useState('')

  const handlePost = () => {
    if (!value.trim()) return
    onPost?.(value)
    setValue('')
  }

  return (
    <Card variant="elevated">
      <Card.Content>
        <Stack direction="horizontal" align="center" gap={3}>
          <Avatar name="현진 이" color="primary" size="md" />
          <TextField
            placeholder="팀과 무엇을 공유하고 싶으신가요?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        </Stack>
      </Card.Content>

      <Divider color="light" />

      <Card.Footer>
        <Stack direction="horizontal" align="center" justify="between">
          <Stack direction="horizontal" gap={1}>
            <IconButton icon={ImageIcon} variant="ghost" size="sm" color="neutral" />
            <IconButton icon={Smile} variant="ghost" size="sm" color="neutral" />
            <IconButton icon={AtSign} variant="ghost" size="sm" color="neutral" />
            <IconButton icon={Hash} variant="ghost" size="sm" color="neutral" />
          </Stack>
          <Stack direction="horizontal" gap={2} align="center">
            {value && (
              <span className="text-xs text-gray-400">{value.length} / 500</span>
            )}
            <Button
              variant="solid"
              color="primary"
              size="sm"
              disabled={!value.trim()}
              onClick={handlePost}
            >
              게시하기
            </Button>
          </Stack>
        </Stack>
      </Card.Footer>
    </Card>
  )
}
