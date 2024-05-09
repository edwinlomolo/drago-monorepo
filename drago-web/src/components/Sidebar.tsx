import Link from 'next/link'
import { loaders } from '@/components/Loader'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
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
import { Check, Home, Package, Store, UserPlus, Route, Settings, Waypoints, Users, SquarePlus } from 'lucide-react'

interface Props {
  userInfo: any,
  userInfoLoading: boolean
  onBusinessSelect: (businessId: string) => void
  hasBusinessListing: boolean
  business: any[]
  settingDefaultBusiness: boolean
  onNavigate: (path: string) => void
}

const Sidebar = ({business, onNavigate, settingDefaultBusiness, userInfo, userInfoLoading, onBusinessSelect, hasBusinessListing}: Props) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {hasBusinessListing && (
          <DropdownMenu>
            {(userInfoLoading || settingDefaultBusiness) && (
              <div className="m-1 items-center flex">
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
              onClick={() => onNavigate("/dashboard")}
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
              onClick={() => onNavigate("/courier/view/couriers")}
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
            <Button
              className="border-0 cursor-pointer transition-colors md:h-8 md:w-8 h-9 w-9" size="icon" variant="link"
            >
              <SquarePlus className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Business</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => onNavigate("/business/create")}>
                <Store className="mr-2 h-4 w-4" />
                <span>New</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Courier</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => onNavigate("/courier/create")}>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Add</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Trip</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => onNavigate("/dashboard")}>
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
  )
}

export default Sidebar
