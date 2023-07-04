import { Contest } from './helpers/interfaces'
import Link from 'next/link'

interface ContestProps {
  contest: Contest
}

export default function Contest({ contest }: ContestProps) {
  return (
    <Link href={`/contests/${contest.id}`}>
      <div
        key={contest.id}
        className='bg-white rounded-lg overflow-hidden shadow-md'
        style={{
          gridRowEnd: `span ${Math.ceil(Math.random() * 2)}`,
        }}
      >
        <img
          src={contest.cover_picture?.picture_path}
          className='h-3/6 w-full h-54 object-cover'
        />
        <div className='px-4 py-3'>
          <h3 className='text-gray-900 font-medium text-lg mb-2'>
            {contest.title}
          </h3>
          <h3 className='text-gray-900 font-medium text-lg mb-2'>
            {contest.status}
          </h3>
          <p className='text-gray-600 text-sm'>
            {contest.upload_phase_end.slice(0, 10)}
          </p>
        </div>
      </div>
    </Link>
  )
}
