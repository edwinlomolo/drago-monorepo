import { gql } from '@apollo/client'

export const GET_BUSINESS_TRIPS = gql`
  query GetTripsBelongingToBusiness {
    getTripsBelongingToBusiness {
      id
      courier {
        id
        firstname
        lastname
        phone
      }
      status
      distance
    }
  }
`
