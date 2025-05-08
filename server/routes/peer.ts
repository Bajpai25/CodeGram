// peer.controller.ts
import { Request, Response } from 'express';
import Peer from "../models/peers";

// Create Peer
export const createPeer = async (req: Request, res: Response) => {
  try {
    const peer = await Peer.create(req.body);
    res.status(201).json(peer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating peer', error });
  }
};

// Get Peer by ID
export const getPeerById = async (req: Request, res: Response) => {
  try {
    const peer = await Peer.findById(req.params.id);
    if (peer) {
      res.status(200).json(peer);
    } else {
      res.status(404).json({ message: 'Peer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving peer', error });
  }
};

// Get All Peers
export const getAllPeers = async (_req: Request, res: Response) => {
  try {
    const peers = await Peer.find();
    res.status(200).json(peers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving peers', error });
  }
};