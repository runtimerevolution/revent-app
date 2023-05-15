interface Contest {
  name: string
  description: string
  date_end: string
  status: string
}
interface ContestProps {
  contest: Contest
}

export default function Contest({ contest }: ContestProps) {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img className='w-full' src='/images/contest.jpeg' alt='' />

      <div className='px-6 py-4 text-center'>
        <div className='font-bold text-xl mb-2'>{contest.name}</div>
        <p className='text-gray-700 text-base'>{contest.description}</p>
        <p className='text-gray-700 text-base'>
          <a>End date123: </a>
          {contest.date_end.slice(0, 10)}
        </p>
        <p>{contest.status}</p>
      </div>
    </div>
  )
}
