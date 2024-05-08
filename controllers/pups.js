import Pup from '../models/pup.js'
import {Error} from 'mongoose'
import { sendError, sendUnauthorized } from '../lib/common.js'

// * Pups Index 
// For: Matches
// Method: GET
// Path: /api/pups
export const pupIndex = async (req, res) => {
  try {
    const foundPups = await Pup.find()
    res.json(foundPups)
  } catch (error) {
    sendError(error, res)
  }
}

// * Pup by owner (secureRoute - profile)
// For: Profile 
// Method: GET
// Path: /api/users/:userId/pups
export const pupOwned = async (req, res) => {
  try {
    const { userId } = req.params.userId
    const foundPups = await Pup.find({ owner: userId })
    res.json(foundPups)
  } catch (error) {
      sendError(error, res)
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
    console.log('Error:', error);
    sendError(error, res)
  }
}

// * Pup Update (secureRoute)
// For: updating the users pup's details
// Method: PUT
// Path: /api/users/:userId/pups/:pupId
export const pupUpdate = async (req, res) => {
  try {
    const { userId, pupId } = req.params;
    const updatedPupData = req.body;

    const pup = await Pup.findOneAndUpdate(
      { _id: pupId, owner: userId },
      updatedPupData,
      { new: true }
    )

    if (!pup) {
      return res.status(404).json({ error: 'Pup not found' })
    }

    res.json(pup)
  }catch (error) {
    sendError(error, res)
  }
}

// * Pup Delete (secureRoute)
// For: deleting current pup
// Method: DELETE
// Path: /api/users/:userId/pups/:pupId
export const pupDelete = async (req, res) => {
  try {
    const { userId, pupId } = req.params

    const pup = await Pup.findOne({ _id: pupId, owner: userId });
    if (!pup) {
      throw new Error.DocumentNotFoundError("Pup Not Found");
    }
    
    if (!pup.owner.equals(req.currentUser._id)) {
      throw new sendUnauthorized();
    }
    
    await pup.deleteOne();
    
    res.sendStatus(204);
  } catch (error) {
    sendError(error, res);
  }
};