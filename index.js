import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(json());

// Para analizar cuerpos con formato application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
}
);

app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});