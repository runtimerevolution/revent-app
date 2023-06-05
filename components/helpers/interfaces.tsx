import React from 'react'
import { ReactNode } from 'react'

export type IFilter = 'All' | 'Open' | 'Voting' | 'Closed'

export interface Contest {
  id: number
  name: string
  description: string
  dateStart: string
  dateEnd: string
  status: IFilter
}

export interface Notification {
  user: string
  opened: boolean
  profile_picture: Picture
  message: string
  timestamp: string
  picture: Picture
}

export interface NotificationsList {
  displayedNotifications: Notification[]
}
export interface Picture {
  picture_path: string
}
export interface Collection {
  id: number
  name: string
  picture: Picture[]
  user: string
}

export interface MyPhoto {
  id: number
  name: string
  picture: Picture[]
  user: string
}
export interface CollectionsProps {
  collectionList: Collection[]
}

export interface MyPhotosProps {
  myphotosList: MyPhoto[]
}

export interface MyPhotoProps {
  myphoto: MyPhoto
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
