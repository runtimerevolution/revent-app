import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
//import { useState } from 'react'

const { NEXT_PUBLIC_DECODE_PREFIX } = process.env
export default function BlurImage({
  contestId,
  submissionId,
  url,
  user,
  description,
}) {
  // TODO add loading image logic
  // const [isLoading, setLoading] = useState(true)
  if (!url.includes('data:image') && !url.includes('blob'))
    url = NEXT_PUBLIC_DECODE_PREFIX + url

  return (
    <div className='w-full h-5/6'>
      <Link href={`/contest/${contestId}/submission/${submissionId}`}>
        <div className='w-full h-full bg-gray-200 rounded-lg overflow-hidden relative'>
          <Image
            alt=''
            src={url}
            sizes='100%'
            layout='fill'
            objectfit='contain'
            className='object-contain'
            //onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </Link>

      <h3 className='mt-4 text-sm text-gray-700'>{user}</h3>
      <p className='mt-1 text-lg font-medium text-gray-900'>{description}</p>
    </div>
  )
}

BlurImage.propTypes = {
  contestId: PropTypes.string,
  submissionId: PropTypes.string,
  url: PropTypes.string,
  user: PropTypes.string,
  description: PropTypes.string,
}
