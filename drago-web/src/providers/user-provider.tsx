import { createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/apollo/queries/get-user'
import { AppContext } from '@/providers/app-provider'

interface IUser {
  userInfo: any
  userInfoLoading: boolean
}

export const UserContext = createContext<IUser>({
  userInfo: undefined,
  userInfoLoading: false,
})

interface Props {
  children: React.ReactNode,
}

const UserProvider = ({ children }: Props) => {
  const { isAuthed } = useContext(AppContext)
  const { data: userInfo, loading: userInfoLoading } = useQuery(GET_USER, {
    skip: !isAuthed,
  })

  return (
    <UserContext.Provider
      value={{
        userInfo: userInfo?.getUser,
        userInfoLoading,
      }}
      >
      {children}
      </UserContext.Provider>
  )
}

export default UserProvider
