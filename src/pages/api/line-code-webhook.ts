import { db } from '@utilities/adminFirebase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query
  const baseURL = process.env.EXT_PUBLIC_BASE_URL || 'fixme'
  try {
    const isValidState = (await db.doc(`states/${state}`).get()).exists
    isValidState
      ? res.redirect(`${baseURL}?code=${code}`)
      : res.redirect(baseURL)
  } catch (e) {
    //todo
    console.log(e)
  }
}
