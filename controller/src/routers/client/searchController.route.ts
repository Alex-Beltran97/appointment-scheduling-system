import express from "express";
import { consultantServiceSearchController } from "../../controller/client";

const router = express.Router();

const {search} = consultantServiceSearchController;

router.get("/", search.bind(consultantServiceSearchController));

export default router;
