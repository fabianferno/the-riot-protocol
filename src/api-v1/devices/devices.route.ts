import { Router } from "express";
import Controller from "./devices.controller";

const users: Router = Router();
const controller = new Controller();

// Retrieve all Users
users.get("/", controller.getAllDevices);

export default users;
