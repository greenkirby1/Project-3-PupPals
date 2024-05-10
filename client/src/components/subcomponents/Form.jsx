import { Fragment, useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'

export default function Form({ submit, fields, request, onLoad }) {

  const fieldsReduced = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.type === 'multi' ? [] : ''])
  )

  // ! State
  const [formData, setFormData] = useState(fieldsReduced)
  const [error, setError] = useState('')

  // ! Event driven functions
  async function handleSubmit(e) {
    // prevents default form submit behaviour
    e.preventDefault()
    console.log('handle submit:', formData)
    try {
      await request(formData)
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      setError(error.response.data)
    }
  }

  const handleChange = (fieldName) => {
    return (event) => {
      const { value } = event.target
      let parsedValue = value
      if (fieldName === 'neutered') {
        parsedValue = value === 'yes' ? true : false
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: parsedValue,
      }))
      setError('')
    }
  }

  const handleInputChange = (fieldName, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }))
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
      {Object.entries(fields).map(([fieldName, fieldData]) => {
        const fieldNameCaps = fieldName
          .replace(/([A-Z[])/g, ' $1')
          .replace(/^./, function (str) { return str.toUpperCase() })
        return (
          <Fragment key={fieldName}>
            <label htmlFor={fieldName}>{fieldNameCaps}</label>
            {/*text input default*/}
            {fieldData.type !== 'select' && fieldData.type !== 'multi' && (
              <input
                type={fieldData.type}
                id={fieldName}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e)}
                placeholder={fieldData.placeholder || fieldName}
              />
            )}

            {/* if type is for select */}
            {fieldData.type === 'select' && (
              <select
                name={fieldName}
                id={fieldName}
                value={formData[fieldName] ? 'yes' : 'no'}
                onChange={(e) => handleChange(fieldName)(e)}
              >
                <option value="">{fieldNameCaps}</option>
                {fieldData.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}



            {/*if type is multi select*/}
            {fieldData.type === 'multi' && (
              <Creatable
                onCreateOption={(value) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldName]: [...prevFormData[fieldName], value],
                  }))
                }}
                onChange={handleChange(fieldName)}
                value={formData[fieldName].map((value) => ({
                  value,
                  label: value,
                }))}
                isMulti={true}
              />)}

          </Fragment>
        )
      })}
      <button type="submit">{submit}</button>
      
    </form>
  )
}


