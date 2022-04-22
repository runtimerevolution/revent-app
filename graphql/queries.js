import { gql } from '@apollo/client'

// ------------------------------------------------- QUERIES ------------------------------------------------- //
export const GET_CURRENT_PHOTOS_BY_ID = gql`
  query getSubmissionsByContestId($id: ID!) {
    getSubmissionsByContestId(id: $id) {
      id
      content
      description
    }
  }
`

export const GET_ALL_CURRENT_CONTESTS = gql`
  {
    getCurrentContests {
      id
      dateStart
      dateEnd
      name
      description
    }
  }
`

export const GET_VOTES_BY_SUBMISSION_ID = gql`
  query getVotesBySubmissionId($id: ID!) {
    getVotesBySubmissionId(id: $id) {
      id
      value
    }
  }
`

export const GET_COMMENTS_BY_SUBMISSION_ID = gql`
  query getCommentsBySubmissionId($id: ID!) {
    getCommentsBySubmissionId(id: $id) {
      id
      text
    }
  }
`

// ------------------------------------------------- MUTATIONS ------------------------------------------------- //
export const ADD_PHOTO = gql`
  mutation addSubmission(
    $content: String!
    $description: String!
    $userID: ID!
    $contestID: ID!
  ) {
    addSubmission(
      content: $content
      description: $description
      contestId: $contestID
      userId: $userID
    ) {
      content
      description
    }
  }
`

export const ADD_CONTEST = gql`
  mutation addContest(
    $name: String!
    $description: String!
    $dateStart: DateTime!
    $dateEnd: DateTime!
  ) {
    addContest(
      name: $name
      description: $description
      dateStart: $dateStart
      dateEnd: $dateEnd
    ) {
      id
      name
      description
      dateStart
      dateEnd
    }
  }
`

export const VOTE_PHOTO = gql`
  mutation submitVote($value: String!, $userID: ID!, $submissionID: ID!) {
    addVote(userId: $userID, submissionId: $submissionID, value: $value) {
      value
    }
  }
`

export const COMMENT_PHOTO = gql`
  mutation submitComment($text: String!, $userID: ID!, $submissionID: ID!) {
    addComment(userId: $userID, submissionId: $submissionID, text: $text) {
      text
    }
  }
`

export const EDIT_PHOTO = gql`
  mutation updateSubmission(
    $id: ID!
    $content: String!
    $description: String!
  ) {
    updateSubmission(id: $id, content: $content, description: $description) {
      id
      content
      description
    }
  }
`
