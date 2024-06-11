import http from 'http';
import dotenv from 'dotenv';
import app from './app/app.js';
import dbConnect from './config/dbConnect.js';
dotenv.config();

// create the server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  dbConnect();
  console.log(`Server is up and running on port ${PORT}`);
});
