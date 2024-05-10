'use client'

import { useContext } from 'react'
import { BusinessContext } from '@/providers/business-provider'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { loaders } from '@/components/Loader'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { userAvatarFallback } from '@/lib/utils'


const columns: ColumnDef<any>[] = [
  {
    header: "Name",
    cell: ({ cell, row }) => {
      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{userAvatarFallback(row.original.firstname, row.original.lastname)}</AvatarFallback>
          </Avatar>
          {`${row.original.firstname} ${row.original.lastname}`}
        </div>
      )
    },
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
]

const CouriersTable = () => {
  const { couriers, couriersLoading } = useContext(BusinessContext)

  return (
    <div className="lg:container py-10">
      {couriersLoading ? <loaders.Submitting /> : <DataTable columns={columns} data={couriers || []} />}
    </div>
  )
}

export default CouriersTable
