import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query users($id: String) {
    users(id: $id) {
      id
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
        file
      }
      status
    }
  }
`

export const GET_CONTEST_DETAIL = gql`
  query GetContest($filters: ContestFilter!) {
    contests(filters: $filters) {
      id
      title
      description
      prize
      upload_phase_end
      upload_phase_start
      voting_phase_end
      cover_picture {
        file
      }
    }
  }
`

export const GET_COLLECTION_DETAIL = gql`
  query GetCollection($filters: CollectionFilter!) {
    collections(filters: $filters) {
      id
      name
      pictures {
        file
        user {
          id
          name_first
          name_last
        }
        likes {
          id
          name_first
          name_last
        }
      }
    }
  }
`

export const GET_CONTEST_SUBMISSIONS = gql`
  query GetContestSubmissions($filters: ContestSubmissionFilter!) {
    contest_submissions(filters: $filters) {
      id
      submission_date
      picture {
        file
        user {
          id
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
        id
        name_last
        name_first
        profile_picture {
          file
        }
      }
      pictures {
        file
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
          file
          user {
            id
          }
        }
        submission_date
      }
    }
  }
`

export const CREATE_CONTEST = gql`
  mutation CREATE_CONTEST($contest: ContestInput!) {
    create_contest(input: $contest) {
      ... on ContestType {
        id
        title
        description
        created_by {
          id
        }
        cover_picture {
          id
        }
        prize
        automated_dates
        upload_phase_start
        upload_phase_end
        voting_phase_end
        winners {
          id
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

export const GET_COLLECTION_PICTURES = gql`
  query GetCollection($filters: CollectionFilter!) {
    collections(filters: $filters) {
      id
      user {
        id
        name_last
        name_first
        profile_picture {
          file
        }
      }
      pictures {
        file
      }
      name
    }
  }
`

export const CREATE_PICTURE = gql`
  mutation CREATE_PICTURE($picture: PictureInput!) {
    create_picture(input: $picture) {
      ... on PictureType {
        id
        user {
          id
        }
        file
        likes {
          id
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

export const SEARCH_QUERY = gql`
  query SearchQuery($filters: CollectionFilter!) {
    contests(filters: $filters) {
      id
      prize
      status
      title
      upload_phase_end
      upload_phase_start
      voting_phase_end
      description
      cover_picture {
        id
        file
      }
    }
  }
`

export const GET_PICTURE_COMMENTS = gql`
  query GetPictureComments($filters: PictureCommentFilter!) {
    picture_comments(filters: $filters) {
      text
      user {
        id
        name_first
        name_last
      }
      picture {
        likes {
          id
        }
        file
        user {
          id
          name_first
          name_last
        }
      }
    }
  }
`
