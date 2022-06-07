import { Router } from "express";
import Controller from "./devices.controller";

const devices: Router = Router();
const controller = new Controller();

// Retrieve all Users
devices.get("/", controller.getAllLogs);
devices.get("/", controller.pushData);

export default devices;
