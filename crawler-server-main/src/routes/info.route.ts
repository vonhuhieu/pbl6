import { Router } from "express";
import { countInfomationHandler } from "../controller/info.controller";

const infoRoutes = Router();

// prefix: /info

infoRoutes.get("/", countInfomationHandler);

export default infoRoutes;