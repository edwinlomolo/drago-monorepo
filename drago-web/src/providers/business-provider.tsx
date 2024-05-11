'use client'

import { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_BUSINESS_COURIERS } from '@/apollo/queries/business-couriers'
import { GET_BUSINESS_TRIPS } from '@/apollo/queries/business-trips'
import { CREATE_TRIP } from '@/apollo/mutations/create-trip'
import { ADD_COURIER } from '@/apollo/mutations/create-courier'
import { createContext } from 'react'
import useUserBusiness from '@/hooks/business-service'
import { AppContext } from '@/providers/app-provider'
import { UserContext } from '@/providers/user-provider'

interface IBusinessContext {
  business: any[]
  hasBusinessListing: boolean
  loadingBusinesses: boolean
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
  const { userInfo } = useContext(UserContext)
  const { business, loadingBusinesses, hasBusinessListing } = useUserBusiness()
  const { data: couriers, loading: couriersLoading } = useQuery(GET_BUSINESS_COURIERS, {
    variables: { id: userInfo?.metadata.default_business ?? "" },
    skip: !userInfo?.metadata.default_business || !isAuthed,
  })
  const [createCourier, { loading: creatingCourier }] = useMutation(ADD_COURIER)
  const [createTrip, { loading: creatingTrip }] = useMutation(CREATE_TRIP)
  const { data: businessTrips, loading: gettingBusinessTrips } = useQuery(GET_BUSINESS_TRIPS, {
    variables: { id: userInfo?.metadata.default_business ?? "" },
    skip: !userInfo?.metadata.default_business || !isAuthed,
  })

  return (
    <BusinessContext.Provider
      value={{
        business,
        hasBusinessListing,
        loadingBusinesses,
        couriers: couriers?.getCouriersBelongingToBusiness,
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
