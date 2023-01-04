import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import { Avatar, Box, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { title } from 'process'
import { useAuthContext } from './AuthContext'
import axios from 'axios'
import router from 'next/router'

interface Props {
  title: string
  handleOpen: any
}

export default function Header({ title, handleOpen }: Props) {
  const handleLogin = async () => {
    const res = await axios.get('/api/create-state')
    const state = res.data.state
    const url = new URL('https://access.line.me/oauth2/v2.1/authorize')
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID
        ? process.env.NEXT_PUBLIC_LINE_CLIENT_ID
        : 'FIXME', //todo: どっかで環境変数の判定を持たせる
      state,
      scope: 'profile openid',
      bot_prompt: 'aggressive', // ログイン時にBOT連携
      redirect_uri: 'http://localhost:3000/api/line-code-webhook',
    }).toString()

    router.replace(url.href)
  }

  const { user } = useAuthContext()
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {user ? (
              <Avatar src={user.iconImageURL} />
            ) : (
              <Button color='inherit' onClick={handleLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Slide>
  )
}
