import dotenv from "dotenv";
import app from "./app.js";
import { connectToDatabase } from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });
