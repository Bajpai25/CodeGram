import { Schema, model, Document } from 'mongoose';

// Define the schema
const OnboardSchema = new Schema(
  {userId: { type: String, required: true },
    name: { type: String, required: true },
    areaOfInterest: { type: String, required: true },
    skillLevel: { type: String, required: true },
    preferredLanguage: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    learningPath: { type: String, required: true },
    studyYear: { type: String, required: true },
    codingGoals: { type: String, required: true },
    communicationTools: { type: [String], required: true },
    assessmentType: { type: String, required: true },
    careerStage: { type: String, required: true },
    timeCommitment: { type: String, required: true },
  },
  { timestamps: true }
);

// Define TypeScript interface for Onboard
interface Onboard extends Document {
  userId: string;
  name: string;
  areaOfInterest: string;
  skillLevel: string;
  preferredLanguage: string;
  experienceLevel: string;
  learningPath: string;
  studyYear: string;
  codingGoals: string;
  communicationTools: string[];
  assessmentType: string;
  careerStage: string;
  timeCommitment: string;
}

// Create model
const Onboard = model<Onboard>('Onboard', OnboardSchema);

export default Onboard;
