import express from "express";
import userRoutes from "./routes/userRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./database/connectDB.js";

const app = express();
const PORT = Number(process.env.PORT || 3000);

console.log("PORT NUMMER:", PORT);

app.use(express.json());
app.use("/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    // mit Datenbank Verbinden
    await connectDB(process.env.MONGODB_URL);
    console.log("Verbindung mit MongoDB hat geklappt");

    // server öffnen
    app.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exitCode = 1;
  }
};

startServer();

export default app;
