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

// * Pup by owner (secureRoute - profile)
// For: Profile 
// Method: GET
// Path: /api/users/:userId/pups
export const pupOwned = async (req, res) => {
  try {
    const { userId } = req.params
    const foundPups = await Pup.find({ owner: userId })
    res.json(foundPups)
  } catch (error) {
    console.log('Error retrieving pups:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


// * Pup Create (secureRoute - profile)
// For: creating user pup
// Method: POST
// Path: /api/users/:userId/pups
export const pupCreate = async (req, res) => {
  try {
    const { userId } = req.params
    const pupData = await Pup.create(req.body)
    pupData.owner = userId

    return res.status(201).json(pupData)
  } catch (error) {
    console.log(error)
  }
}

// * Pup Update (secureRoute)
// For: updating the users pup's details
// Method: PUT
// Path: /api/users/:userId/pups/:pupId
export const pupUpdate = async (req, res) => {
  try {
    const { userId, pupId } = req.params
    const updatedPupData = req.body

    const pup = await Pup.findOneAndUpdate(
      { _id: pupId, owner: userId },
      updatedPupData,
      { new: true }
    )

    if (!pup) {
      return res.status(404).json({ error: 'Pup not found' })
    }

    res.json(pup)
  } catch (error) {
    console.log(error)
  }
}

// * Pup Delete (secureRoute)
// For: deleting current pup
// Method: DELETE
// Path: /api/users/:userId/pups/:pupId
export const pupDelete = async (req, res) => {
  try {
    const { userId, pupId } = req.params

    const pup = await Pup.findOneAndDelete({ _id: pupId, owner: userId })

    if (!pup) {
      return res.status(404).json({ error: 'Pup not found' })
    }

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
}