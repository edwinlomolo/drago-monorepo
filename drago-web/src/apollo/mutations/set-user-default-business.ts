import { gql } from '@apollo/client'

export const SET_USER_DEFAULT_BUSINESS = gql`
  mutation SetUserDefaultBusiness($businessId: UUID!) {
    setUserDefaultBusiness(businessId: $businessId) {
      id
    }
  }
`
