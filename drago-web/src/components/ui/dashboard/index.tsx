'use client'

import Map from '@/components/GoogleMap'
import CreateTripForm from '@/components/form/create-trip'

function Dashboard() {
  return (
    <div className="flex flex-col w-full md:flex-row lg:flex-row h-full">
      <div className="bg-white m-4 grow md:w-2/5">
        <CreateTripForm />
      </div>
      <div className="hidden md:block lg:block grow md:w-3/5">
        <Map />
      </div>
    </div>
  )
}

export default Dashboard
