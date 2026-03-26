# Sociopedia

Integrative project by Santiago Elordieta, React + MongoDB social media app.

Sociopedia is a full-stack social platform built with React, Express, and MongoDB. It includes authentication, profiles, friendships, a post feed, image uploads, likes, and responsive layouts for desktop and mobile.

## Technologies Used

- React
- Redux Toolkit
- React Router
- Material UI
- Formik
- Yup
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Vercel Blob

## Run Locally

1. Install dependencies:
   - `cd client && npm install`
   - `cd ../server && npm install --legacy-peer-deps`
2. Create environment files:
   - Copy `client/.env.example` to `client/.env`
   - Copy `server/.env.example` to `server/.env`
3. Fill in `server/.env` with your MongoDB Atlas connection string and JWT secret.
4. Start the backend:
   - `cd server && npm start`
5. Start the frontend:
   - `cd client && npm start`

The frontend uses CRA proxying in local development, so API requests go through `/api` and assets through `/assets` without hardcoded localhost values in the source code.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Add these environment variables in the Vercel project settings:
   - `MONGO_URL`
   - `JWT_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - Optional: `REACT_APP_API_URL=/api`
   - Optional: `REACT_APP_ASSETS_URL=/assets`
4. Deploy.

`vercel.json` is configured to:
- build the React frontend from `client/`
- expose the Express backend as a Vercel Function through `server/vercel.js`
- route `/api/*` to the backend
- route `/assets/*` to backend-served local assets

## Notes

- In production on Vercel, uploaded images use Vercel Blob because the Vercel filesystem is not persistent.
- Existing absolute image URLs stored in MongoDB still render correctly because asset resolution is centralized in `client/src/config.js`.
