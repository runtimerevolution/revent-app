import { gql } from '@apollo/client'

// Substituir queryName depois quando souber e os respetivos parametros
// Falta associar as fotos ao concurso atual, para apenas pertencerem ao concurso que está a decorrer atualmente
export const GET_CURRENT_PHOTOS = gql`
  {
    submissions {
      content
      description
    }
  }
`

export const GET_CURRENT_CONTEST = gql`
  {
    contests {
      id
      dateStart
      dateEnd
      name
      description
    }
  }
`

export const GET_VOTES = gql`
  query votes($content: String!) {
    votes(content: $content) {
      value
      Submission {
        content
      }
    }
  }
`

export const GET_COMMENTS = gql`
  query comments($content: String!) {
    comments(content: $content) {
      text
      Submission {
        content
      }
    }
  }
`

// Por enquanto só tem o content para a descriçao da foto
// o id e description é o que quero que me retorne
export const ADD_PHOTO = gql`
  mutation addSubmission(
    $content: String!
    $description: String!
    $user: user!
    $contest: String!
  ) {
    add_submission(
      content: $content
      description: $description
      contest: $contest
    ) {
      id
      content
      description
      contest
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
    add_contest(
      name: $name
      description: $description
      dateStart: $dateStart
      dateEnd: $dateEnd
    ) {
      name
      description
      dateStart
      dateEnd
    }
  }
`

export const VOTE_PHOTO = gql`
  mutation submitVote($value: String) {
    addVote(value: $value) {
      value
    }
  }
`

export const COMMENT_PHOTO = gql`
  mutation submitComment($text: String) {
    add_comment(text: $text) {
      text
    }
  }
`

// export const EDIT_PHOTO = gql`
//   mutation queryName($description: String) {
//     queryName(description: $description) {
//       id
//       description
//     }
//   }
// `
