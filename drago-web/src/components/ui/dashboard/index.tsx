'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { Map } from '@vis.gl/react-google-maps'
import { mapStyle } from '@/theme/map-style'
import CreateTripForm from '@/components/form/create-trip'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Boxes, Users } from 'lucide-react'

function Dashboard() {
  const { location } = useContext(AppContext)

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1">
      <div className="md:w-3/4 w-full mx-2 flex-1 place-self-center flex-col flex">
        <CreateTripForm />
      </div>
      <div className="lg:grid md:hidden hidden">
        <div className="flex items-center gap-4">
          <div>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-0.5">
                  <Users className="h-5 w-5" color="#166534" />
                  <span className="font-bold">0</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Online couriers</TooltipContent>
            </Tooltip>
          </div>
          <div>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-0.5">
                  <Boxes className="h-5 w-5" color="#a16207" />
                  <span className="font-bold">0</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Active/On-going trips</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Map
          style={{height: '80vh'}}
          defaultZoom={16}
          defaultCenter={location}
          styles={mapStyle}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </div>
    </div>
  )
}

export default Dashboard
