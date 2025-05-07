import express from "express";
import problem from "./problem";
import accounts from "./accounts";
import { createOnboard, getOnboard } from "./onboard";
import { generateRoadmap ,addRoadmap , fetchAllRoadmaps , fetchRoadmapById } from "./roadmap";

const router = express.Router();

router.use("/problem", problem);
router.use("/accounts", accounts);
router.post("/onboard",createOnboard);
router.get("/onboard_data",getOnboard);
router.post("/generate_roadmap",generateRoadmap);
// Endpoint to add a new roadmap
router.post('/roadmap', addRoadmap);

// Endpoint to fetch all roadmaps
router.get('/roadmaps', fetchAllRoadmaps);

// Endpoint to fetch a specific roadmap by ID
router.get('/roadmap/:roadmapId', fetchRoadmapById);
  

export default router;
