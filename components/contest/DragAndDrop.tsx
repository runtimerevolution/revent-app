import { useRef, useState } from "react";
import { CREATE_CONTEST_SUBMISSION, UPDATE_CONTEST_SUBMISSION } from 'lib/graphql'
import { useMutation } from "@apollo/client";


export default function DragAndDrop(image: any, contest) {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [file, setFile] = useState<any>(null);
    const [imageUploaded, setImageUploaded] = useState<any>(image ? image?.picture.file : null)

    const [createContestSubmission] = useMutation(CREATE_CONTEST_SUBMISSION)
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

    function removeFile(fileName: any) {
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
            if (image == null) {
                var response = await createContestSubmission({
                    variables: {},
                })
                console.log("Create", response)
            } else {
                var response = await updateContestSubmission({
                    variables: {},
                })
                console.log("Update", response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center h-screen">
            <form
                className={`${dragActive ? "bg-blue-400" : "bg-blue-100"
                    } relative w-2/3 h-1/2 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                onDragEnter={handleDragEnter}
                onSubmit={handleSubmit}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
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
                            className="font-bold text-blue-600 cursor-pointer"
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
                                onClick={() => removeFile(imageUploaded.name)}
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
                        className='absolute -bottom-32  text-gray-700 bg-forest-green border-white border-2
                        text-white px-3 py-2 rounded-full font-inter cursor-pointer w-1/2'
                        type='submit'
                    >
                        SUBMIT
                    </button>
                )}
            </form>
        </div>
    );
}