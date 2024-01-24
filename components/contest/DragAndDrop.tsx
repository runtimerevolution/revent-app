import { useRef, useState } from "react";
import { CREATE_CONTEST_SUBMISSION, UPDATE_CONTEST_SUBMISSION } from 'lib/graphql'
import { useMutation } from "@apollo/client";
import { USER_INFO } from 'hooks/auth'
import toast from 'react-hot-toast'


export default function DragAndDrop({ submission, contest, refetch }) {
    const awsEnv = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL

    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [file, setFile] = useState<any>(null);
    const [imageUploaded, setImageUploaded] = useState<any>(submission ? (awsEnv + submission?.picture.file) : null)

    const [createContestSubmission] = useMutation(CREATE_CONTEST_SUBMISSION,)
    const [updateContestSubmission] = useMutation(UPDATE_CONTEST_SUBMISSION)


    function handleChange(e: any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageUploaded(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setImageUploaded(URL.createObjectURL(e.dataTransfer.files[0]))
        }
    }

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile() {
        setFile(null);
        setImageUploaded(null)
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (submission == null) {
                var { data } = await createContestSubmission({
                    variables: {
                        input: {
                            contest: contest.id,
                            picture: {
                                user: localStorage.getItem(USER_INFO),
                                file: file,
                            }
                        }
                    },
                })
                if (data['create_contest_submission']['results'] === null) {
                    toast.error(data['create_contest_submission']['errors'])
                } else {
                    toast.success('Thank you for your submission')
                    refetch()
                }
            } else {
                var { data } = await updateContestSubmission({
                    variables: {
                        input: {
                            id: submission?.id,
                            picture: {
                                user: localStorage.getItem(USER_INFO),
                                file: file,
                            }
                        }
                    },
                })
                if (data['update_contest_submission']['results'] === null) {
                    toast.error(data['update_contest_submission']['errors'])
                } else {
                    toast.success('Your submission was updated successfully.')
                    refetch()
                }
            }
        } catch (error) {
            toast.error('Failed to submit your picture.')
        }
    }

    return (
        <div className="flex justify-center h-screen">
            <form
                className={`${dragActive ? "bg-light-orange" : ""
                    } relative w-full h-1/2 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                onDragEnter={handleDragEnter}
                onSubmit={handleSubmit}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                <input
                    placeholder="fileInput"
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    multiple={true}
                    onChange={handleChange}
                    accept="image/*"
                />

                {!imageUploaded && (
                    <p>
                        Drag & Drop Image or{" "}
                        <span
                            className="font-bold text-orange cursor-pointer"
                            onClick={openFileExplorer}
                        >
                            <u>Select Image</u>
                        </span>{" "}
                    </p>
                )}

                <div className="absolute top-1 right-2">
                    {imageUploaded && (
                        <div className="flex flex-row space-x-5">
                            <span>{imageUploaded.name}</span>
                            <span
                                className="text-grey cursor-pointer"
                                onClick={() => removeFile()}
                            >
                                X
                            </span>
                        </div>
                    )}
                </div>
                <div className={`${imageUploaded ? "bg-white w-full h-full" : ""}`}>
                    <img className={`${imageUploaded ? "object-scale-down  w-full h-full" : ""}`} src={imageUploaded} />
                </div>
                {imageUploaded && (
                    <button
                        className='absolute -bottom-32 text-gray-700 bg-dark-orange border-white border-2
                        text-white px-3 py-2 rounded-full font-inter cursor-pointer w-1/3'
                        type='submit'
                    >
                        SUBMIT
                    </button>
                )}
            </form>
        </div>
    );
}