import { gql } from '@apollo/client'

export const GET_BUSINESS_BELONGING_TO_USER = gql`
  query GetBusinessBelongingToUser {
    getBusinessBelongingToUser {
      id
      name
      businessType
      logo
    }
  }
`
