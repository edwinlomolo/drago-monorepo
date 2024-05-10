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
    header: "Courier",
    cell: ({ cell, row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{userAvatarFallback(row.original.courier.firstname, row.original.courier.lastname)}</AvatarFallback>
          </Avatar>
          {`${row.original.courier.firstname} ${row.original.courier.lastname}`}
        </div>
      )
    },
  },
  {
    header: "Pickup",
    accessorKey: "pickup_address",
  },
  {
    header: "Dropoff",
    accessorKey: "dropoff_address",
  },
  {
    header: "Distance",
    accessorKey: "distance",
  },
]

const TripsTable = () => {
  const { businessTrips, gettingBusinessTrips } = useContext(BusinessContext)

  return (
    <div className="lg:container py-10">
      {gettingBusinessTrips ? <loaders.Submitting /> : <DataTable columns={columns} data={businessTrips || []} />}
    </div>
  )
}

export default TripsTable
