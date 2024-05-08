'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { BusinessContext } from '@/providers/business-provider'
import { UserContext } from '@/providers/user-provider'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { SET_USER_DEFAULT_BUSINESS } from '@/apollo/mutations/set-user-default-business'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

interface Props {
  children: React.ReactNode,
}

function RootLayout({ children }: Props) {
  const { user, isAuthed, authLoading } = useContext(AppContext)
  const router = useRouter()
  const { business, hasBusinessListing } = useContext(BusinessContext)
  const { userInfo, userInfoLoading } = useContext(UserContext)
  const [setDefaultBusiness, { loading: settingDefaultBusiness }] = useMutation(SET_USER_DEFAULT_BUSINESS)
  const onBusinessSelect = (id: string) => {
    if (!settingDefaultBusiness) {
      setDefaultBusiness({
        variables: {
          businessId: id,
        },
        refetchQueries: [
          "GetUser",
          "GetCouriersBelongingToBusiness",
          "GetTripsBelongingToBusiness",
        ],
      })
    }
  }

  return authLoading ? null : (
    <div className="min-h-screen grid grid-cols-1 w-full bg-muted/40">
      {isAuthed && (
        <Sidebar
          business={business}
          settingDefaultBusiness={settingDefaultBusiness}
          userInfo={userInfo}
          userInfoLoading={userInfoLoading}
          onBusinessSelect={onBusinessSelect}
          hasBusinessListing={hasBusinessListing}
          onNavigate={router.push}
        />
      )}
      <div className={`${isAuthed ? `sm:py-4 sm:pl-14` : ``}`}>
        <Header isAuthed={isAuthed} user={user} onNavigate={router.push} />
        <main className={`${isAuthed ? `sm:mx-4 sm:my-4` : ``}`}>
          {children}
        </main>
      </div>
      <div className="flex bottom-0 text-sm content-center px-4 mt-auto md:justify-center justify-between items-center w-full">
        <p className="my-2 mr-4">&copy; {new Date().getFullYear()} &#x2022; Drago Technologies Ltd</p>
        <a className="mr-4 md:mr-0" href="mailto:lomoloedwin@gmail.com">Contact</a>
        <a className="ml-2" href="/privacy-policy">Privacy</a>
      </div>
    </div>
  )
}

export default RootLayout
