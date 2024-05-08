import Pup from '../models/pup.js'


// * Pups Index 
// For: Matches
// Method: GET
// Path: /api/pups
export const pupIndex = async (req, res) => {
  try {
    const foundPups = await Pup.find()
    res.json(foundPups)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// * Show Single Pup (secureRoute - profile)
// For: Profile - showing the single pup and updating it
// Method: GET
// Path: /api/pups/:pupId
export const pupOwned = async (req, res) => {
  try {
    const { pupId } = req.params
    const foundPup = await Pup.findById(pupId)
    res.json(foundPup)
  } catch (error) {
    console.log('Error retrieving pups:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


// * Pup Create (secureRoute - profile)
// For: creating user pup
// Method: POST
// Path: /api/pups
export const pupCreate = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    const newPup = await Pup.create(req.body)
    return res.status(201).json(newPup)
  } catch (error) {
    console.log(error)
  }
}

// * Pup Update (secureRoute)
// For: updating the users pup's details
// Method: PUT
// Path: /api/pups/:pupId
export const pupUpdate = async (req, res) => {
  try {
    const { pupId } = req.params
    const pupToUpdate = await Pup.findById(pupId)
    if (!pupToUpdate) {
      return res.status(404).json({ error: 'Pup not found' })
    }
    Object.assign(pupToUpdate, req.body)
    await pupToUpdate.save()
    return res.json(pupToUpdate)
  } catch (error) {
    console.log(error)
  }
}

// * Pup Delete (secureRoute)
// For: deleting current pup
// Method: DELETE
// Path: /api/pups/:pupId
export const pupDelete = async (req, res) => {
  try {
    const { pupId } = req.params

    const pup = await Pup.findOneAndDelete({ _id: pupId })

    if (!pup) {
      return res.status(404).json({ error: 'Pup not found' })
    }

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
}