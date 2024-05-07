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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Check, Plus, Store, UserPlus, Route, Settings, Waypoints, Users, SquarePlus } from 'lucide-react'
import { Home, Menu, LogOut, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { signOut } from 'next-auth/react'
import { userAvatarFallback } from '@/lib/utils'
import Link from 'next/link'
import { loaders } from '@/components/Loader'
import { useMutation } from '@apollo/client'
import { SET_USER_DEFAULT_BUSINESS } from '@/apollo/mutations/set-user-default-business'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

interface Props {
  children: React.ReactNode,
}

/*
const links = [
  {value: "/couriers", label: "Couriers", icon: <Users className="mr-2 h-4 w-4" />},
  {value: "/trips", label: "Trips", icon: <Waypoints className="mr-2 h-4 w-4" />},
]
 */

function RootLayout({ children }: Props) {
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
        refetchQueries: [
          "GetUser",
          "GetCouriersBelongingToBusiness",
          "GetTripsBelongingToBusiness",
        ],
      })
    }
  }

  return authLoading ? null : (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      {isAuthed && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {hasBusinessListing && (
              <DropdownMenu>
                {(userInfoLoading || settingDefaultBusiness) && (
                  <div className="items-center flex">
                    <loaders.Submitting />
                  </div>
                )}
                {(!userInfoLoading && !settingDefaultBusiness) && (
                  <DropdownMenuTrigger>
                    <Avatar className="m-1">
                      <AvatarImage src={`${business.find(item => item.id === userInfo?.metadata?.default_business)?.logo}`} alt="logo" />
                      <AvatarFallback delayMs={600}>{business.find(item => item.id === userInfo?.metadata?.default_business)?.name[0]}</AvatarFallback>
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
            {!hasBusinessListing && (
              <Link
                href="/dashboard"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Package className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Drago</span>
              </Link>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="border-0 cursor-pointer transition-colors md:h-8 md:w-8 h-9 w-9" size="icon" variant="link"
                >
                  <Home className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="border-0 cursor-pointer transition-colors md:h-8 md:w-8 h-9 w-9" size="icon" variant="link"
                >
                  <Users className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Couriers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="border-0 cursor-pointer transition-colors md:h-8 md:w-8 h-9 w-9" size="icon" variant="link"
                >
                  <Waypoints className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Trips</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">
                  <SquarePlus className="h-5 w-5" />
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
                <DropdownMenuLabel>Trip</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => {}}>
                      <Route className="mr-2 h-4 w-4" />
                      <span>Create</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <nav className="flex flex-col items-center px-2 sm:py-5 mt-auto gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      )}
      <div className={`flex flex-col sm:gap-4 ${isAuthed ? `sm:py-4 sm:pl-14` : ``}`}>
        <header className="sticky top-0 flex h-14 z-30 items-center gap-4 border-b sm:static sm:h-auto sm:border-0 sm:bg-transparent bg-background px-4 sm:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {!isAuthed && (
              <Button variant="link" onClick={() => router.push("/")} size="icon">
                <Package className="h-8 w-8" />
              </Button>
            )}
            <Badge className="pointer-events-none font-extrabold h-4 bg-yellow-600">beta</Badge>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package className="h-6 w-6" />
                  <span className="sr-only">Drago</span>
                  <Badge className="pointer-events-none font-extrabold h-4 bg-yellow-600">beta</Badge>
                </Link>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Trips
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Couriers
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
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
                  <DropdownMenuLabel>Trip</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => {}}>
                      <Route className="mr-2 h-4 w-4" />
                      <span>Create</span>
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
        </header>
        <main className={`grid h-80 items-start ${isAuthed ? `p-4 sm:px-6` : ``} sm:py-0 md:gap-8 flex-1 gap-4`}>
          {children}
        </main>
      </div>
      <div className="flex bottom-0 text-sm content-center mt-auto md:justify-center justify-between items-center w-full">
        <p className="my-2 mx-4">&copy; {new Date().getFullYear()} &#x2022; Drago Technologies Ltd</p>
        <a className="mr-4 md:mr-0" href="mailto:lomoloedwin@gmail.com">Contact</a>
        <a className="ml-2 mr-0.5 md:mr-0" href="/privacy-policy">Privacy</a>
      </div>
    </div>
  )
}

export default RootLayout
