import { gql } from '@apollo/client'

// Substituir queryName depois quando souber e os respetivos parametros
// Falta associar as fotos ao concurso atual, para apenas pertencerem ao concurso que está a decorrer atualmente
export const GET_CURRENT_PHOTOS = gql`
  {
    queryName { 
      parametros que preciso
    }
  }
`

export const GET_CURRENT_CONTEST = gql`
{
  queryName { 
    date_start
    date_end
    name
    description
  }
}
`

export const GET_VOTES = gql`
{
    queryName { 
      parametros que preciso
  }
}
`

export const GET_COMMENTS = gql`
{
    queryName { 
      parametros que preciso
  }
}
`

export const VOTE_PHOTO = gql`
  mutation queryName(){
    queryName() { 
      parametros que preciso de receber
  }
}
`
// Por enquanto só tem o content para a descriçao da foto
// o id e description é o que quero que me retorne
export const ADD_PHOTO = gql`
  mutation queryName($description: String){
    queryName(description: $description){
      id
      description
    }
  }
`

export const COMMENT_PHOTO = gql`
mutation queryName($description: String){
    queryName(description: $description){ 
      id
      description
  }
}
`
