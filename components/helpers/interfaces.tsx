export interface IFilter {
  status: 'All' | 'Open' | 'Voting' | 'Closed'
}

export interface ContestType {
  name: string
  description: string
  date_start: string
  date_end: string
  status: string
}
export interface HomeProps {
  contestList: ContestType[]
}

export interface Picture {
  id: number
  picture_path: string
}

export interface Collection {
  id: number
  name: string
  picture: Picture[]
  user: string
}
export interface CollectionsProps {
  collectionList: Collection[]
}
