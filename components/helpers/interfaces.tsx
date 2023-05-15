import React from 'react'

export type IFilter = 'All' | 'Open' | 'Voting' | 'Closed'
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

export interface ContestFilterProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  statusFilter: IFilter
  setStatusFilter: React.Dispatch<React.SetStateAction<IFilter>>
}

export interface CollectionProps {
  collection: Collection
}
