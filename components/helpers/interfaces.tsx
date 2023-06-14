import React from 'react'

export type IFilter = 'All' | 'Open' | 'Voting' | 'Closed'

export interface PicturePath {
  picture_path: string
}
export interface Contest {
  id: number
  description: string
  title?: string
  upload_phase_end?: string
  cover_picture?: PicturePath
  status?: string
  name?: string
  dateEnd?: string
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
export interface CollectionsProps {
  collectionList: Collection[]
}

export interface MyPhoto {
  id: number
  description: string
  pictures: Picture[]
  user: string
}
export interface ContestFilterProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  statusFilter: IFilter
  setStatusFilter: React.Dispatch<React.SetStateAction<IFilter>>
}
