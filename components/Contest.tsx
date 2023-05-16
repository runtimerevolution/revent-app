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
    // <div className='max-w-sm rounded overflow-hidden shadow-lg '>
    //   <img className='w-full' src='/images/contest.jpeg' alt='' />

    //   <div className='px-6 py-4 text-center'>
    //     <div className='font-bold text-xl mb-2'>{contest.name}</div>
    //     <p className='text-gray-700 text-base'>{contest.description}</p>
    //     <p className='text-gray-700 text-base'>
    //       <a>End date: </a>
    //       {contest.date_end.slice(0, 10)}
    //     </p>
    //     <p>{contest.status}</p>
    //   </div>
    // </div>
    <div
      key={index}
      className='relative bg-white rounded-lg overflow-hidden shadow-md'
      style={{
        maxHeight: '310px',
        gridRowEnd: `span ${Math.ceil(Math.random() * 1.75)}`,
      }}
    >
      <img src='/images/contest.jpeg' className='w-full h-48 object-cover' />
      <div className='px-4 py-3'>
        <h3 className='text-gray-900 font-medium text-lg mb-2'>
          {contest.name}
        </h3>
        <p className='text-gray-600 text-sm'>{contest.date_end}</p>
      </div>
    </div>

    // <div className='flex flex-col bg-white rounded-lg overflow-hidden shadow-md'>
    //   <img src='/images/contest.jpeg' className='object-cover w-full h-auto' />
    //   <div className='flex-grow flex flex-col justify-between px-4 py-3'>
    //     <h3 className='text-gray-900 font-medium text-lg mb-2'>
    //       {contest.name}
    //     </h3>
    //     <p className='text-gray-600 text-sm'>{contest.description}</p>
    //   </div>
    // </div>
  )
}
