import React from 'react'

export default function Submission({ image, setSelectedImage }) {
  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  return (
    <div key={image.id} className='w-1/4 mt-2 flex flex-col items-center mx-2'>
      <img
        src={image.picture.file}
        alt={`Image ${image.id}`}
        className='w-full h-auto max-h-60'
        onClick={() => handleImageClick(image)}
      />
      <p className='mt-2 text-center'>
        User: {image.picture.user.name_first} {image.picture.user.name_last}
      </p>
      <div className=' flex items-center justify-center'>
        <button
          className='mt-2 text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2'
          type='submit'
        >
          Vote
        </button>
      </div>
    </div>
  )
}
