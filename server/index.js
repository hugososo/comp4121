import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import customizeRoute from "./routes/customize.routes.js";
import catalogRoute from "./routes/catalog.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }));

app.use("/api/v1/customize/", customizeRoute);
app.use("/api/v1/catalog/", catalogRoute);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from CustomizeRoute" });
});

app.get("/catalog", (req, res) => {
    res.status(200).json({ message: "Hello from Catalog" });
});

app.listen(8080, () => console.log("Server has started on port 8080"));
