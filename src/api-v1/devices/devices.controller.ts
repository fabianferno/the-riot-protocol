//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const keccak256 = require("keccak256");

const prisma = new PrismaClient();

export default class DeviceController {
  public getAllLogs = async (req: Request, res: Response): Promise<any> => {
    try {
      const devices = await prisma.logs.findMany();
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

  public pushData = async (req: Request, res: Response): Promise<any> => {
    const {
      deviceId,
      ownerHash,
      firmwareHash,
      metadataHash,
      sensorName,
      sensorValue,
    } = req.body;

    const riotHash = keccak256(
      (
        keccak256(deviceId).toString("hex") +
        ownerHash +
        firmwareHash +
        metadataHash
      ).toString("hex")
    );

    // Call Contract Method
    const contractResponse = {} as any;

    if (riotHash !== contractResponse.riotHash) {
      try {
        const result = await prisma.logs.create({
          data: {
            deviceId,
            sensorName,
            sensorValue,
            timestamp: new Date(),
          },
        });
        return res.status(200).json({
          message: "success",
          result,
        });
      } catch (e) {
        console.error(e);
        res.status(500).send({
          success: false,
          message: e.toString(),
        });
      }
    } else {
      return res.status(200).json({
        message: "riot-validation-failed",
        result: "",
      });
    }
  };
}
