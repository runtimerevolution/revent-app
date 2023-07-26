import React from 'react'

export type IFilter = 'All' | 'open' | 'voting' | 'closed' | 'schedule'

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

export interface User {
  name_first: string
  name_last: string
  email: string
}
export interface Picture {
  picture_path: string
}
export interface Collection {
  id: number
  user: User
  pictures: Picture[]
}
export interface CollectionProps {
  collection: Collection
}

export interface MyPhoto {
  id: number
  description: string
  pictures: Picture[]
  user: string
}
