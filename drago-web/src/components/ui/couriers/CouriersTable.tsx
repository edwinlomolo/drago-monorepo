'use client'

import { useContext } from 'react'
import { BusinessContext } from '@/providers/business-provider'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { loaders } from '@/components/Loader'


const columns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorFn: row => `${row.firstname} ${row.lastname}`,
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
