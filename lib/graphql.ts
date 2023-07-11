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
      description
      prize
      upload_phase_end
      upload_phase_start
      voting_phase_end
      cover_picture {
        picture_path
      }
      status
    }
  }
`

export const GET_CONTEST_DETAIL = gql`
  query GetContest($id: Int!) {
    contests(id: $id) {
      id
      title
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

export const ADD_PHOTO = gql`
  mutation ADD_PHOTO($contestSubmission: ContestSubmissionInput!) {
    create_contestSubmission(input: $contestSubmission) {
      ... on ContestSubmissionType {
        contest {
          id
        }
        picture {
          picture_path
          user {
            email
          }
        }
        submission_date
      }
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

export const CREATE_PHOTO = gql`
  mutation CREATE_PHOTO($picture: PictureInput!) {
    create_picture(input: $picture) {
      ... on PictureType {
        user {
          email
        }
        picture_path
        likes {
          email
        }
      }
      ... on OperationInfo {
        __typename
        messages {
          field
          kind
          message
        }
      }
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
