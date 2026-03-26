import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { put } from "@vercel/blob";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public/assets");
const isBlobUploadEnabled =
  process.env.VERCEL === "1" && Boolean(process.env.BLOB_READ_WRITE_TOKEN);

if (!fs.existsSync(assetsPath)) {
  fs.mkdirSync(assetsPath, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(assetsPath));

const storage = isBlobUploadEnabled
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: function (_, __, cb) {
        cb(null, assetsPath);
      },
      filename: function (_, file, cb) {
        cb(null, file.originalname);
      },
    });

const upload = multer({ storage });

const uploadAsset = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    if (isBlobUploadEnabled) {
      const blob = await put(
        `sociopedia/${Date.now()}-${req.file.originalname}`,
        req.file.buffer,
        {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }
      );

      req.uploadedFilePath = blob.url;
      return next();
    }

    req.uploadedFilePath = req.file.filename;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

app.get("/api/health", (_, res) => {
  res.status(200).json({ ok: true });
});

app.post("/api/auth/register", upload.single("picture"), uploadAsset, register);
app.post(
  "/api/posts",
  verifyToken,
  upload.single("picture"),
  uploadAsset,
  createPost
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
