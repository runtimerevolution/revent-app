import { useField } from 'formik'

export default function CustomFileInput({ errors, label, ...props }) {
  const [, , helpers] = useField(props.name)

  const handleChange = (event) => {
    const file = event.currentTarget.files[0]
    helpers.setValue(file)
  }

  console.log('errors?.cover_picture', errors?.cover_picture)

  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input
        id={props.id}
        name={props.name}
        type='file'
        onChange={handleChange}
        className='border border-black-500'
      />
      {errors?.cover_picture && (
        <div>{String(errors?.cover_picture?.type)}</div>
      )}
    </div>
  )
}
