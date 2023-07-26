import { useRouter } from 'next/router'
import React from 'react'

export default function CollectionPictureDetail() {
  const router = useRouter()
  const { id } = router.query

  return <div>CollectionPictureDetail</div>
}
