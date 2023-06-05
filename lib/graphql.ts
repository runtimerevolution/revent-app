import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query users($email: String) {
    users(email: $email) {
      email
    }
  }
`
// export const GET_USERS = gql`
//   query GetUsers {
//     users(email: "test@test.com") {
//       name_first
//       name_last
//       profile_picture_updated_at
//       user_handle
//     }
//   }
// `
// export const GET_USERS = gql`
// query GetUsers {
//   users {
//     id
//     name
//     email
//   }
//   }
// `

// export const CREATE_USER = gql`
//   mutation CreateUser($input: CreateUserInput!) {
//     createUser(input: $input) {
//       id
//       name
//       email
//     }
//   }
// `
