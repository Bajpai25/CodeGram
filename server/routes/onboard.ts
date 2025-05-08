import { Request, Response } from 'express';
import Onboard from '../models/onboard';

// Controller function to create a new Onboard entry
export const createOnboard = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      name,
      areaOfInterest,
      skillLevel,
      preferredLanguage,
      experienceLevel,
      learningPath,
      studyYear,
      codingGoals,
      communicationTools,
      assessmentType,
      careerStage,
      timeCommitment,
      
    } = req.body;

    // Check if userId is already in the database
    // const existingUser = await Onboard.findOne({ userId });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'User with this userId already exists' });
    // }

    // Create a new user document
    const newOnboard = new Onboard({
      userId,
      
      name,
      
      areaOfInterest,
      skillLevel,
      preferredLanguage,
      experienceLevel,
      learningPath,
      studyYear,
      codingGoals,
      communicationTools,
      assessmentType,
      careerStage,
      timeCommitment,
    });

    // Save the user in the database
    await newOnboard.save();

    res.status(201).json({ message: 'User data saved successfully', Onboard: newOnboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



// Controller function to get onboard data by userId

export const getOnboardByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // Extract userId from request body

    // Find the user by userId
    const onboardData = await Onboard.findOne({ userId });
    if (!onboardData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(onboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



// get onboard variable value by userId

export const getOnboard = async (req: Request, res: Response) => {
  try {
    // Extract userId from query parameters
    const userId = req.query.userId as string;  // Explicitly type to string

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Find the user by userId
    const onboardData = await Onboard.findOne({ userId });

    // If user is not found, return a 404 status
    if (!onboardData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the onboard status
    res.status(200).json({ onboard: onboardData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
