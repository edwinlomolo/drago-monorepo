import { gql } from '@apollo/client'

export const GET_BUSINESS_TRIPS = gql`
  query GetTripsBelongingToBusiness($id: UUID!) {
    getTripsBelongingToBusiness(id: $id) {
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
