'use client'

import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_BUSINESS_COURIERS } from '@/apollo/queries/business-couriers'
import { GET_BUSINESS_TRIPS } from '@/apollo/queries/business-trips'
import { CREATE_TRIP } from '@/apollo/mutations/create-trip'
import { ADD_COURIER } from '@/apollo/mutations/create-courier'
import { createContext } from 'react'
import useUserBusiness from '@/hooks/business-service'
import { AppContext } from '@/providers/app-provider'

interface IBusinessContext {
  business: any[]
  hasBusinessListing: boolean
  loadingBusinesses: boolean
  defaultBusiness: any
  setDefaultBusiness: Dispatch<SetStateAction<any>>
  couriers: any[]
  couriersLoading: boolean
  addCourier: (input: any) => void
  addingCourier: boolean
  createTrip: (input: any) => void
  creatingTrip: boolean
  businessTrips: any[]
  gettingBusinessTrips: boolean
}

interface Props {
  children: React.ReactNode
}

export const BusinessContext = createContext<IBusinessContext>({
  business: [],
  hasBusinessListing: false,
  loadingBusinesses: false,
  defaultBusiness: undefined,
  setDefaultBusiness: () => {},
  couriers: [],
  couriersLoading: false,
  addCourier: () => {},
  addingCourier: false,
  createTrip: () => {},
  creatingTrip: false,
  businessTrips: [],
  gettingBusinessTrips: false,
})

const BusinessProvider = ({ children }: Props) => {
  const { isAuthed } = useContext(AppContext)
  const [defaultBusiness, setDefaultBusiness] = useState(null)
  const { business, loadingBusinesses, hasBusinessListing } = useUserBusiness()
  const { data: couriers, loading: couriersLoading } = useQuery(GET_BUSINESS_COURIERS, {
    variables: { id: (defaultBusiness as any)?.id ?? "" },
    skip: !(defaultBusiness as any)?.id || !isAuthed,
  })
  const [createCourier, { loading: creatingCourier }] = useMutation(ADD_COURIER)
  const [createTrip, { loading: creatingTrip }] = useMutation(CREATE_TRIP)
  const { data: businessTrips, loading: gettingBusinessTrips } = useQuery(GET_BUSINESS_TRIPS, {
    variables: { id: (defaultBusiness as any)?.id ?? "" },
    skip: !(defaultBusiness as any)?.id || !isAuthed,
  })

  useEffect(() => {
    if (hasBusinessListing) setDefaultBusiness(business[0])
  }, [business, hasBusinessListing])

  return (
    <BusinessContext.Provider
      value={{
        business,
        hasBusinessListing,
        loadingBusinesses,
        defaultBusiness,
        setDefaultBusiness,
        couriers: couriers?.getBusinessCouriers,
        couriersLoading,
        addCourier: createCourier,
        addingCourier: creatingCourier,
        createTrip,
        creatingTrip,
        businessTrips: businessTrips?.getTripsBelongingToBusiness,
        gettingBusinessTrips,
      }}
    >
      {children}
    </BusinessContext.Provider>
  )
}

export default BusinessProvider
