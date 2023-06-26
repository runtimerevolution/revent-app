import { useField } from 'formik'
import ErrorMessage from '../ErrorMessage'

interface Error {
  title?: string
  description?: string
  prize?: string
  cover_picture?: any
  datesOption?: string
  uploadPhaseDate?: any
  votingPhaseDate?: any
}
interface CustomFileInputProps {
  errors: Error
  label: string
  name: string
}

export default function CustomFileInput({
  errors,
  label,
  ...props
}: CustomFileInputProps) {
  const [, , helpers] = useField(props.name)

  console.log('props', props)

  const handleChange = (event) => {
    const file = event.currentTarget.files[0]
    helpers.setValue(file)
  }

  return (
    <div>
      <label>{label}</label>
      <input
        name={props.name}
        type='file'
        onChange={handleChange}
        className='border border-black-500 w-full'
      />

      {errors?.cover_picture &&
        (errors.cover_picture.type ? (
          <ErrorMessage error={String(errors.cover_picture.type)} />
        ) : (
          <ErrorMessage error={String(errors.cover_picture)} />
        ))}
    </div>
  )
}
