import  express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import DefaultData from "./default.js";
import routes from "./routes/routes.js";
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});


dotenv.config({
    path:"./.env"
});
connectDB();
app.use("/api",routes)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

DefaultData();