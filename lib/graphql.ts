import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query users($email: String) {
    users(email: $email) {
      email
    }
  }
`

export const GET_CONTEST_LIST = gql`
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

export const GET_CONTEST_DETAIL = gql`
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

export const GET_COLLECTION_DETAIL = gql`
  query GetCollection($id: Int!) {
    collections(id: $id) {
      id
      name
      pictures {
        picture_path
        user {
          email
          name_first
          name_last
        }
        likes {
          email
          name_first
          name_last
        }
      }
    }
  }
`

export const GET_CONTEST_SUBMISSIONS = gql`
  query GetContestSubmissions($id: Int!) {
    contest_submissions(contest: $id) {
      id
      submission_date
      picture {
        picture_path
        user {
          email
          name_first
          name_last
        }
      }
    }
  }
`

export const GET_COLLECTION_LIST = gql`
  query collections {
    collections {
      id
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

export const GET_COLLECTION_PICTURES = gql`
  query GetCollection($id: Int!) {
    collections(id: $id) {
      id
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

export const GET_PICTURE_COMMENTS = gql`
  query GetPictureComments($picture_path: String) {
    picture_comments(picture_path: $picture_path) {
      text
      user {
        email
        name_first
        name_last
      }
      picture {
        likes {
          email
        }
        picture_path
        user {
          email
          name_first
          name_last
        }
      }
    }
  }
`

// query MyQuery {
//   picture_comments(picture_path: "") {
//     text
//     user {
//       email
//       name_first
//       name_last
//     }
//     picture {
//       likes {
//         email
//       }
//       picture_path
//       user {
//         email
//         name_first
//         name_last
//       }
//     }
//   }
// }

// query MyQuery {
//   collections(id: 1) {
//     name
//     pictures {
//       picture_path
//       user {
//         email
//         name_first
//         name_last
//       }
//       likes {
//         email
//         name_first
//         name_last
//       }
//     }
//   }
// }

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
