'use client'

import Map from '@/components/GoogleMap'
import CreateTripForm from '@/components/form/create-trip'

function Dashboard() {
  return (
    <div className="grid md:grid-rows-2 lg:grid-cols-2">
      <div className="m-4 flex-1 md:place-self-center md:w-3/4 my-auto">
        <CreateTripForm />
      </div>
      <div className="hidden flex-1 md:block lg:block">
        <Map />
      </div>
    </div>
  )
}

export default Dashboard
