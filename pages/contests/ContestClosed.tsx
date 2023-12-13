import React from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_CONTEST_SUBMISSIONS } from '../../lib/graphql'
import { useState, useEffect } from 'react'
import SubmissionPicture from '../../components/Submissions/SubmissionPicture'
import ImageModal from '../../components/contest/ImageModal'

export default function ContestClosed({ contest }) {
    const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL

    const {
        loading: loadingSubmission,
        error: errorSubmission,
        data: submissionData,
        refetch: refetchContest,
    } = useQuery(GET_CONTEST_SUBMISSIONS, {
        variables: { filters: { contest: { id: contest.id } } },
    })

    const submissionList = submissionData?.contest_submissions

    const [selectedImage, setSelectedImage] = useState(null)
    const [showNextImage, setShowNextImage] = useState(null)

    let imageList = []

    const closeImageModal = () => {
        setSelectedImage(null)
    }

    const imageIndex = (image) => image == selectedImage;

    const previousImage = () => {
        var index = imageList.findIndex(imageIndex)
        if (index == 0) {
            setShowNextImage(imageList[imageList.length - 1])
        } else {
            setShowNextImage(imageList[index - 1])
        }
    }

    const nextImage = () => {
        var index = imageList.findIndex(imageIndex)
        if (index + 1 == imageList.length) {
            setShowNextImage(imageList[0])
        } else {
            setShowNextImage(imageList[index + 1])
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('modal-overlay')) {
                closeImageModal()
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (showNextImage && !selectedImage) {
            setSelectedImage(showNextImage)
            setShowNextImage(null)
        }
    }, [showNextImage])


    var date = new Date(contest?.upload_phase_start)
    var month = date ? date.toLocaleString('default', { month: 'long' }) : ""

    return (
        <>
            <div className='w-full justify-center h-full '>
                <div className='bg-white p-8 rounded-lg shadow-lg'>
                    <div className='flex justify-center items-center'>
                        <div className='relative'>
                            <img
                                src={awsEnv + contest?.cover_picture?.file}
                                alt='Imagem'
                                className='object-fill h-64 w-96'
                            />
                            <div className='absolute top-2 left-2'>
                                <div>
                                    <p className='font-inter text-light-grey'>
                                        {month}
                                    </p>
                                </div>
                                <div className='flex bg-grey px-2 rounded-full'>
                                    <Image
                                        src='/images/lock.svg'
                                        alt='plus'
                                        width={20}
                                        height={20}
                                        className='rounded-full'
                                    />
                                    <p className='text-center font-inter ml-1 text-white'>
                                        {"Contest closed"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='text-center mt-4 text-2xl font-bold'>
                        {contest?.title}
                    </p>
                    <p className='text-center mt-2 text-lg'>
                        {contest?.description}
                    </p>
                    <div className='mt-6'>
                        <div className='grid grid-cols-4 gap-4 mt-4'>
                            {loadingSubmission && <p>Loading</p>}
                            {errorSubmission && (
                                <p>Error while retrieving the contest submissions</p>
                            )}

                            {!loadingSubmission && !errorSubmission && (
                                <>
                                    {submissionList?.map((image) => {
                                        imageList.push(image)
                                        return (
                                            <SubmissionPicture
                                                image={image}
                                                setSelectedImage={setSelectedImage}
                                                contestStatus={contest?.status}
                                            />
                                        )
                                    }

                                    )}
                                </>
                            )}
                        </div>
                        {selectedImage && (
                            <ImageModal
                                closeImageModal={closeImageModal}
                                selectedImage={selectedImage}
                                contest={contest}
                                previousImage={previousImage}
                                nextImage={nextImage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
