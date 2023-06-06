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
}

export interface Notification {
  user: string
  opened: boolean
  profile_picture: Picture
  message: string
  timestamp: string
  picture: Picture
}

export interface Picture {
  id: number
  picture_path: string
}
export interface ContestFilterProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  statusFilter: IFilter
  setStatusFilter: React.Dispatch<React.SetStateAction<IFilter>>
}
