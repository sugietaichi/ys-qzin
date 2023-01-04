import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@utilities/firebase'
import { doc, getDoc } from 'firebase/firestore'

export type UserType = {
  uid: string
  displayName: string
  iconImageURL: string
} | null

export type AuthContextProps = {
  user: UserType
}

export type AuthProps = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      if (!user) return //never
      const ref = doc(db, `users/${user.uid}`)
      getDoc(ref).then((r) => {
        const doc = r.data()
        if (!doc) return
        setUser({
          uid: user.uid,
          displayName: doc.name,
          iconImageURL: doc.picture,
        })
      })
    })
    return () => authStateChanged()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
