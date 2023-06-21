import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query users($email: String) {
    users(email: $email) {
      email
    }
  }
`

export const GET_CONTESTS = gql`
  query contests {
    contests {
      id
      title
      active
      description
      prize
      upload_phase_end
      upload_phase_start
      voting_phase_end
      cover_picture {
        picture_path
      }
    }
  }
`

export const GET_CONTEST = gql`
  query GetContest($id: Int!) {
    contests(id: $id) {
      id
      title
      active
      description
      prize
      upload_phase_end
      upload_phase_start
      voting_phase_end
      cover_picture {
        picture_path
      }
    }
  }
`

export const GET_COLLECTIONS = gql`
  query collections {
    collections {
      user {
        email
        name_last
        name_first
        profile_picture {
          picture_path
        }
      }
      pictures {
        picture_path
      }
      name
    }
  }
`

// query MyQuery {
//   collections(name: "") {
//     user {
//       email
//       name_last
//       name_first
//     }
//     name
//   }
// }
// export const CREATE_USER = gql`
//   mutation CreateUser($input: CreateUserInput!) {
//     createUser(input: $input) {
//       id
//       name
//       email
//     }
//   }
// `
