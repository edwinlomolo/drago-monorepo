import { gql } from '@apollo/client'

export const CREATE_TRIP = gql`
  mutation CreateTrip($input: NewTrip!) {
    createTrip(input: $input) {
      id
    }
  }
`
