'use client'

import { useContext } from 'react'
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { AppContext } from '@/providers/app-provider'
import { signOut } from 'next-auth/react'

function UserMenu() {
  const { user } = useContext(AppContext)

  return (
    <Menu>
      <MenuButton>
        <Avatar src={`${user?.image}`} name={`${user?.name}`} loading='eager' />
      </MenuButton>
      <MenuList>
        <MenuItem>{`${user?.name}`}</MenuItem>
        <MenuItem>{`${user?.email}`}</MenuItem>
        <MenuItem textDecoration='underline' onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
