import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "@/lib/swagger";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const specs = swaggerJsdoc(swaggerOptions);
  res.status(200).json(specs);
}