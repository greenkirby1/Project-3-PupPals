import { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'
import { Container, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


export default function FormComponent({ submit, fields, request, onLoad }) {

  // Creates initial state Object from 'fields', sets default variables based on field type. 
  const fieldsReduced = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.type === 'multi' ? [] : ''])
  )
  
  // Configurations for cloudinary
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
  const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL

  // ! State
  const [formData, setFormData] = useState(fieldsReduced)
  const [error, setError] = useState('')


  // ! Event handlers

  //prevents default form submission, logs data and calls the 'request' with users formData
  async function handleSubmit(e) {
    e.preventDefault()
    console.log('handle submit:', formData)
    try {
      await request(formData)
    } catch (error) {
      setError(error.response.data)
    }
  }

  // Handles the file uploads from cloudinary; on success it updated formData with URL of image. 
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

  // Handles Changes for NON multi-select fields also converts neutered to a boolean (for schema)
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

  // handles changes for multi-select, updates data with array of values
  const handleMultiChange = (fieldName) => {
    return (value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: value ? value.map(option => option.value) : [],
      }))
      setError('')
    }
  }

  // General handler for text input - updates formData
  const handleInputChange = (fieldName, e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }))
  }


  // ! Effects
  // Loads initial data when component mounts; 'onLoad' updates for data with fetched data.
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
        style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', paddingTop: '20px' }}>

        {/*iterates over 'fields' to generate form fields dynamically*/}
        {Object.entries(fields).map(([fieldName, fieldData]) => {

          {/*Format field name to capitilize*/}
          const fieldNameCaps = fieldName
            .replace(/([A-Z[])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase() })

            {/* get current value for formData, convert neutered field to yes/no OR convert to empty for any other field i.e. bitch/dog */}
            let value = formData[fieldName]
            if (fieldName === 'neutered') {
              value = formData[fieldName] ? 'yes' : 'no'
            } else {
              value = formData[fieldName] || ''
            }

          return (
            <FormGroup className='mb-2' key={fieldName}>
              <FormLabel className='small-label'>{fieldNameCaps}</FormLabel>

            {/*!field type conditionality - render based on field type...*/}
              
              {/*if type is for upload file. use handleUpload function (cloudinary)*/}
              {fieldData.type === 'file' && (
                <FormControl
                type={fieldData.type}
                name={fieldName}
                id={fieldName}
                onChange={handleUpload}
                />
              )}

              {/* if type is for select, render drop down with options which are defined in the 'fields' section of component.*/}
              {/*maps through the options array to create individual option elements.*/}
              {/*this is controlled by the formData state and changes are handles by the handleChange function to update state*/}
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



              {/*if type is for multi select, renders multi select input by using 'Creatable' component. handles created options and updates state with selected options*/}
              {/*input value is controlled by formData state, and changes are handled by handleMultiChange function to update state accordingly.*/}
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

                {/*text input default, renders default text input field (e.g.text, number, email).*/}
                {/*input field's value is controlled by formData state, changes are handled by handleInputChange function*/}
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


