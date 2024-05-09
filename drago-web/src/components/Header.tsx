import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { userAvatarFallback } from '@/lib/utils'
import { LogOut, Package, Plus, Store, UserPlus, Route } from 'lucide-react'
import MobileNav from '@/components/MobileNav'

interface Props {
  isAuthed: boolean
  onNavigate: (path: string) => void
  user: any
}

const Header = ({ isAuthed, onNavigate, user }: Props) => {
  return (
    <header className="sticky top-0 flex h-14 z-30 items-center gap-4 border-b sm:static sm:h-auto sm:border-0 sm:bg-transparent bg-background px-4 sm:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {!isAuthed && (
          <Button variant="link" onClick={() => onNavigate("/")} size="icon">
            <Package className="h-8 w-8" />
          </Button>
        )}
      </nav>
      {isAuthed && (
        <MobileNav /> 
      )}
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
                <DropdownMenuItem onSelect={ () => onNavigate("/business/create")}>
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
  )
}

export default Header
