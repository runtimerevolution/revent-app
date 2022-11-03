import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function BlurImage({
  contestId,
  submissionId,
  url,
  user,
  description,
}) {
  if (!url?.includes('data:image') && !url?.includes('blob'))
    url = process.env.NEXT_PUBLIC_DECODE_PREFIX + url

  return (
    <div className='w-full h-5/6'>
      <Link passHref href={`/contest/${contestId}/submission/${submissionId}`}>
        <div className='w-full h-full bg-gray-200 rounded-lg overflow-hidden relative'>
          <Image
            alt=''
            src={url}
            sizes='100%'
            layout='fill'
            objectfit='contain'
            className='object-contain'
          />
        </div>
      </Link>

      <h3 className='mt-4 text-sm text-gray-700'>User : {user}</h3>
      <p className='mt-1 text-lg font-medium text-gray-900'>
        Description : {description}
      </p>
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
