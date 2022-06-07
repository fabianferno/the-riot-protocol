import { Router } from "express";

import devices from "./devices/devices.route";

const router: Router = Router();

router.use("/devices", devices);

export default router;
