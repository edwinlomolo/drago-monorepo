'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { BusinessContext } from '@/providers/business-provider'
import { UserContext } from '@/providers/user-provider'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Check, Plus, Store, UserPlus /*Waypoints, Users*/ } from 'lucide-react'
import { LogOut, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { signOut } from 'next-auth/react'
import { userAvatarFallback } from '@/lib/utils'
import Link from 'next/link'
import { loaders } from '@/components/Loader'
import { useMutation } from '@apollo/client'
import { SET_USER_DEFAULT_BUSINESS } from '@/apollo/mutations/set-user-default-business'

/*
const links = [
  {value: "/couriers", label: "Couriers", icon: <Users className="mr-2 h-4 w-4" />},
  {value: "/trips", label: "Trips", icon: <Waypoints className="mr-2 h-4 w-4" />},
]
 */

function Header() {
  const { user, isAuthed, authLoading } = useContext(AppContext)
  const { business, hasBusinessListing } = useContext(BusinessContext)
  const router = useRouter()
  const { userInfo, userInfoLoading } = useContext(UserContext)
  const [setDefaultBusiness, { loading: settingDefaultBusiness }] = useMutation(SET_USER_DEFAULT_BUSINESS)
  const onBusinessSelect = (id: string) => {
    if (!settingDefaultBusiness) {
      setDefaultBusiness({
        variables: {
          businessId: id,
        },
        refetchQueries: ["GetUser"],
      })
    }
  }

  return authLoading ? null : (
    <div className="flex flex-row border-b justify-between w-full">
      <div className="flex flex-row my-4 mx-4">
        {!hasBusinessListing && isAuthed && (
          <Button variant="link" onClick={() => router.push("/dashboard")} size="icon">
            <Package className="h-8 w-8" />
          </Button>
        )}
        {!isAuthed && (
          <Button variant="link" onClick={() => router.push("/")} size="icon">
            <Package className="h-8 w-8" />
          </Button>
        )}
        {hasBusinessListing && (
          <DropdownMenu>
            {(userInfoLoading || settingDefaultBusiness) && (
              <div className="items-center flex">
                <loaders.Submitting />
              </div>
            )}
            {(!userInfoLoading && !settingDefaultBusiness) && (
              <DropdownMenuTrigger>
                <Avatar className="p-0.5">
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent>
              <DropdownMenuLabel>You businesses</DropdownMenuLabel>
              <DropdownMenuGroup>
                {business.map(item => (
                  <DropdownMenuItem key={item.id} onSelect={() => onBusinessSelect(item.id)}>
                    {userInfo?.metadata?.default_business === item.id && <Check className="mr-2 h-4 w-4" />} {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Badge className="pointer-events-none font-extrabold h-4 bg-yellow-900">beta</Badge>
        {hasBusinessListing && (
          <NavigationMenu className="ml-2">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
      <div className="flex flex-row gap-4 mx-4 my-4">
        {isAuthed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Business</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => router.push("/business/create")}>
                  <Store className="mr-2 h-4 w-4" />
                  <span>New</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Courier</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => router.push("/courier/create")}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Add</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        {isAuthed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={`${user?.image}`} alt="avatar" />
                <AvatarFallback>{userAvatarFallback(user?.name?.split(' ')[0], user?.name?.split(' ')[1])}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>Signed in as</p>
                <span className="text-sm font-semibold">{user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => signOut({callbackUrl: "/"})} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Header
