import { IFilter } from './helpers/interfaces'

interface Contest {
  name: string
  description: string
  date_end: string
  status: IFilter
}
interface ContestProps {
  contest: Contest
  index: number
}

export default function Contest({ contest, index }: ContestProps) {
  return (
    <div
      key={index}
      className='bg-white rounded-lg overflow-hidden shadow-md'
      style={{
        gridRowEnd: `span ${Math.ceil(Math.random() * 2)}`,
      }}
    >
      <img
        src='/images/contest.jpeg'
        className='h-3/6 w-full h-54 object-cover'
      />
      <div className='px-4 py-3'>
        <h3 className='text-gray-900 font-medium text-lg mb-2'>
          {contest.name}
        </h3>
        <h3 className='text-gray-900 font-medium text-lg mb-2'>
          {contest.status}
        </h3>
        <p className='text-gray-600 text-sm'>{contest.date_end}</p>
      </div>
    </div>
  )
}
