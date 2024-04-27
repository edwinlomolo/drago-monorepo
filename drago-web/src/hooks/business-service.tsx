import { useContext, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_BUSINESS_BELONGING_TO_USER } from '@/apollo/queries/user-business'
import { CREATE_BUSINESS } from '@/apollo/mutations/create-business'
import { AppContext } from '@/providers/app-provider'

function useUserBusiness() {
  const { isAuthed } = useContext(AppContext)
  const { data, loading, error } = useQuery(GET_BUSINESS_BELONGING_TO_USER, { skip: !isAuthed })
  const business = useMemo(() => (data?.getBusinessBelongingToUser || []), [data])
  const hasBusinessListing = useMemo(() => (data?.getBusinessBelongingToUser || []).length > 0, [data])
  const [createBusiness, { loading: createBusinessLoading }] = useMutation(CREATE_BUSINESS)

  return {
    business,
    hasBusinessListing,
    loadingBusinesses: loading,
    creatingBusiness: createBusinessLoading,
    createBusiness,
    error,
  }
}

export default useUserBusiness
