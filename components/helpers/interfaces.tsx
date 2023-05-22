import React from 'react'
import { ReactNode } from 'react'

export type IFilter = 'All' | 'Open' | 'Voting' | 'Closed'
export interface ContestType {
  name: string
  description: string
  date_start: string
  date_end: string
  status: IFilter
}
export interface HomeProps {
  contestList: ContestType[]
  notifications: Notification[]
}

export interface LayoutProps {
  notifications: any
  children: ReactNode
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

export interface Notification {
  contest: string
  date: string
  description: string
  user: string
}

export interface NavbarProps {
  notifications: Notification[]
}
