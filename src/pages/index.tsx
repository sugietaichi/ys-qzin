import { useAuthContext } from '@components/AuthContext'
import { auth } from '@utilities/firebase'
import axios from 'axios'
import { signInWithCustomToken } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Avatar, Button, Grid, Typography } from '@mui/material'

export default function () {
  const router = useRouter()
  useEffect(() => {
    if (router.query.code) signIn()
  }, [router.query.code])

  const signIn = async () => {
    const token = (
      await axios.post('/api/create-custom-token', { code: router.query.code })
    ).data.token
    await signInWithCustomToken(auth, token)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography>まいつーる。</Typography>
        <Typography>フォーマaaaaット交換後から</Typography>
      </Grid>
    </Grid>
  )
}
