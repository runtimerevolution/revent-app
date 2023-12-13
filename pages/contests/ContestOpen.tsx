import React from 'react'
import Image from 'next/image'
import DragAndDrop from 'components/contest/DragAndDrop'

export default function ContestClosed({ contest }) {
    const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL


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
                                <div className='flex bg-forest-green px-2 rounded-full'>
                                    <Image
                                        src='/images/camera.svg'
                                        alt='plus'
                                        width={20}
                                        height={20}
                                        className='rounded-full'
                                    />
                                    <p className='text-center font-inter ml-1 text-white'>
                                        {"Contest open"}
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
                        <DragAndDrop />
                    </div>
                </div>
            </div>
        </>
    )
}