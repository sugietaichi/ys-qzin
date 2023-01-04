import { auth, db } from '@utilities/adminFirebase'
import { nowYMDhms } from '@utilities/datefmt'
import axios from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'

const getAccessToken = async (code: string) => {
  const resp = await axios.post(
    `https://api.line.me/oauth2/v2.1/token`,
    new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET || '',
      redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URL || '',
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  )
  return resp.data.id_token
}

const getLoginUserInfo = async (code: string) => {
  const token = await getAccessToken(code)

  const resp = await axios.post(
    `https://api.line.me/oauth2/v2.1/verify`,
    new URLSearchParams({
      id_token: token,
      client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID || '',
    }),
  )
  return resp.data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body
  const user = await getLoginUserInfo(code)
  const provID = user.sub //fix line idのみ

  await db.collection('users').doc(user.sub).set(
    {
      lastVisit: nowYMDhms(),
    },
    { merge: true },
  )
  const token = await auth.createCustomToken(provID)

  res.status(200).json({ token })
}
