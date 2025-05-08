import express from "express";
import problem from "./problem";
import accounts from "./accounts";
import { createOnboard, getOnboard } from "./onboard";
import { generateRoadmap ,addRoadmap , fetchAllRoadmaps , fetchRoadmapById , fetch_roadmap_by_userId } from "./roadmap";
import { createPeer, getPeerById, getAllPeers } from "./peer";

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

// Endpoint to fetch a specific roadmap by userId

router.get('/roadmap/user/:userId', fetch_roadmap_by_userId);

router.post('/peers', createPeer);
router.get('/peers/:id', getPeerById);
router.get('/peers', getAllPeers);

export default router;
