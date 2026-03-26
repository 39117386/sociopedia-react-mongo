import serverless from "serverless-http";
import app from "./app.js";
import { connectToDatabase } from "./db.js";

const serverlessHandler = serverless(app);

export default async function handler(req, res) {
  await connectToDatabase();
  return serverlessHandler(req, res);
}
