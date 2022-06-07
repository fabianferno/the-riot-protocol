//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  public getAllDevices = async (req: Request, res: Response): Promise<any> => {
    try {
      const devices = await prisma.devices.findMany();
      return res.status(200).json({
        message: "success",
        devices,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };
}
