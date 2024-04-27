'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { BusinessContext } from '@/providers/business-provider'
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

/*
const links = [
  {value: "/couriers", label: "Couriers", icon: <Users className="mr-2 h-4 w-4" />},
  {value: "/trips", label: "Trips", icon: <Waypoints className="mr-2 h-4 w-4" />},
]
 */

function Header() {
  const { user, isAuthed, authLoading } = useContext(AppContext)
  const { business, defaultBusiness, hasBusinessListing, setDefaultBusiness } = useContext(BusinessContext)
  const router = useRouter()

  return authLoading ? null : (
    <div className="flex flex-row border justify-between w-full">
      <div className="flex flex-row my-4 mx-4">
        {!hasBusinessListing && isAuthed && (
          <Button variant="link" onClick={() => router.push("/dashboard")} size="icon">
            <Package className="h-8 w-8" />
          </Button>
        )}
        {!isAuthed && <Package className="h-8 w-8" />}
        {hasBusinessListing && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="p-0.5">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>You businesses</DropdownMenuLabel>
              <DropdownMenuGroup>
                {business.map(item => (
                  <DropdownMenuItem key={item.id} onSelect={() => setDefaultBusiness(item)}>
                    {defaultBusiness?.id === item.id && <Check className="mr-2 h-4 w-4" />} {item.name}
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
