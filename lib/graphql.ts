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
