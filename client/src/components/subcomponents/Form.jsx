import { Fragment, useEffect, useState } from 'react'

export default function Form({ submit, fields, request, onLoad }) {

  const fieldsReduced = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value === 'multi' ? [] : ''])
  );

  // ! State
  const [formData, setFormData] = useState(fieldsReduced)
  const [error, setError] = useState('')

  // ! Event driven functions
  async function handleSubmit(e) {
    // prevents default form submit behaviour
    e.preventDefault()
    try {
      await request(formData)
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      setError(error.response.data)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setError('')
  }

  // ! Effects
  useEffect(() => {
    async function fillFields() {
      try {
        const { data } = await onLoad()
        setFormData(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data)
      }
    }
    if (onLoad) {
      fillFields()
    }
  }, [onLoad])

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(fields).map(([fieldName, fieldType]) => {
        const fieldNameCaps = fieldName[0].toUpperCase() + fieldName.slice(1)
        return (
          <Fragment key={fieldName}>
            <label htmlFor={fieldName}>{fieldNameCaps}</label>
            <input
              type={fieldType}
              id={fieldName}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={handleChange}
              placeholder={fieldName}
            />
          </Fragment>
        )
      })}
      <button type="submit">{submit}</button>
    </form>
  )
}


