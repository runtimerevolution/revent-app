import React from 'react'

export default function ImageModal({ closeImageModal, selectedImage, contest, nextImage, previousImage }) {
    const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL
    return (
        <>
            <div
                className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 '
                onClick={closeImageModal}
            >
                <div className='modal-container'>
                    <div className='relative modal-content bg-white'>
                        <img
                            src={awsEnv + selectedImage.picture.file}
                            alt={`Image ${selectedImage.id}`}
                            className='w-auto max-h-80'
                        />
                        <div className='absolute top-0 -left-32 mt-32 bg-white w-12 z-2 rounded-full' onClick={previousImage}>
                            <img
                                src='/images/chevronleft.svg'
                            />
                        </div>
                        <div className='absolute top-0 -right-32 mt-32 bg-white w-12 z-2 rounded-full' onClick={nextImage}>
                            <img
                                src='/images/chevronright.svg'
                            />
                        </div>
                        {contest?.status == 'voting' &&
                            <div className='absolute w-full'>
                                <div className='mt-16 grid grid-cols-6'>
                                    <div className='col-start-2 col-span-4'>
                                        <button
                                            className='text-gray-700 bg-forest-green border-white border-2
                                             text-white px-3 py-2 rounded-full font-inter cursor-pointer w-full'
                                            type='submit'
                                        >
                                            VOTE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </>
    )
} 