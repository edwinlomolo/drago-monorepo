import { gql } from '@apollo/client'

export const GET_BUSINESS_COURIERS = gql`
  query GetBusinessCouriers($id: UUID!) {
    getBusinessCouriers(id: $id) {
      id
      firstname
      lastname
    }
  }
`
