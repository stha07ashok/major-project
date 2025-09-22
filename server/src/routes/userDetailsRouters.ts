import express from "express";
import { getDetails } from "../controllers/userDetailsController";

export const userDetailsRouter = express.Router();

userDetailsRouter.get("/userdetails", getDetails);
