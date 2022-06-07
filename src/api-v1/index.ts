import { Router } from "express";
const router: Router = Router();

import devices from "./devices/devices.route";

router.use("/devices", devices);

export default router;
