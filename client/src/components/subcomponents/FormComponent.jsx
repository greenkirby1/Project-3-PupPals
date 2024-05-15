import { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'
import { Container, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


export default function FormComponent({ submit, fields, request, onLoad }) {

  const fieldsReduced = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.type === 'multi' ? [] : ''])
  )
  
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
  const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL


  // ! State
  const [formData, setFormData] = useState(fieldsReduced)
  const [error, setError] = useState('')


  // ! Event driven functions
  async function handleSubmit(e) {
    e.preventDefault()
    console.log('handle submit:', formData)
    try {
      await request(formData)
    } catch (error) {
      setError(error.response.data)
    }
  }

  const handleUpload = async (e) => {
    console.log('hit handle upload')
    const form = new FormData()
    form.append('file', e.target.files[0])
    form.append('upload_preset', uploadPreset)
    try {
      const { data } = await axios.post(uploadUrl, form)
      setFormData({ ...formData, image: data.secure_url})
    } catch (error) {
      setError(error.message)
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

  const handleMultiChange = (fieldName) => {
    return (value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: value ? value.map(option => option.value) : [],
      }))
      setError('')
    }
  }

  const handleInputChange = (fieldName, e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }))
  }


  // ! Effects
  useEffect(() => {
    async function fillFields() {
      try {
        const data = await onLoad()
        // console.log('this is fillFields data:', data)
        setFormData(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data)
      }
    }
    if (onLoad) {
      // console.log('hit onLoad')
      fillFields()
    }
  }, [onLoad])

  return (
    <form onSubmit={handleSubmit}>
      <Container className='p-5 d-flex flex-column' 
        style={{ backgroundColor: 'white', borderRadius: '8px', width: '50%', paddingTop: '20px' }}>
        {Object.entries(fields).map(([fieldName, fieldData]) => {

          const fieldNameCaps = fieldName
            .replace(/([A-Z[])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase() })

            let value = formData[fieldName]
            if (fieldName === 'neutered') {
              value = formData[fieldName] ? 'yes' : 'no'
            } else {
              value = formData[fieldName] || ''
            }

          return (
            <FormGroup className='mb-2' key={fieldName}>
              <FormLabel className='small-label'>{fieldNameCaps}</FormLabel>

              
              {/*if type is for upload file*/}
              {fieldData.type === 'file' && (
                <FormControl
                type={fieldData.type}
                name={fieldName}
                id={fieldName}
                onChange={handleUpload}
                />
              )}

              {/* if type is for select */}
              {fieldData.type === 'select' && (
                <FormControl
                as="select"
                name={fieldName}
                id={fieldName}
                value={value}
                onChange={(e) => handleChange(fieldName)(e)}
                >
                  <option value="">{fieldNameCaps}</option>
                  {fieldData.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </FormControl>
              )}



              {/*if type is multi select*/}
              {fieldData.type === 'multi' && (
                <Creatable
                onCreateOption={(newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldName]: [...prevFormData[fieldName], newValue],
                  }))
                }}
                onChange={handleMultiChange(fieldName)}
                value={formData[fieldName].map((value) => ({
                  value,
                  label: value,
                }))}
                isMulti={true}
                />)}

                {/*text input default*/}
                {fieldData.type !== 'select' && fieldData.type !== 'multi' && fieldData.type !== 'file' && (
                  <FormControl
                    type={fieldData.type}
                    id={fieldName}
                    name={fieldName}
                    value={formData[fieldName] || ''}
                    onChange={(e) => handleInputChange(fieldName, e)}
                    placeholder={fieldData.placeholder || fieldName}
                  />
                )}
            </FormGroup>
          )
        })}
      <button className='form-button' type='submit'>{submit}</button>
      </Container>
    </form>
  )
}


