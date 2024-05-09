import { gql } from '@apollo/client'

export const GET_BUSINESS_COURIERS = gql`
  query GetCouriersBelongingToBusiness {
    getCouriersBelongingToBusiness {
      id
      firstname
      lastname
      phone
    }
  }
`
