import { gql } from '@apollo/client'

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($input: NewBusinessInput!) {
    createBusiness(input: $input) {
      id
    }
  }
`
