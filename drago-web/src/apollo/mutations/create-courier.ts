import { gql } from '@apollo/client'

export const ADD_COURIER = gql`
  mutation AddCourier($input: NewCourierInput!) {
    addCourier(input: $input) {
      id
    }
  }
`
