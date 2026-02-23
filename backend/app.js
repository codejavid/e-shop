
import express from "express";
import dotenv from "dotenv";
// import cors from "cros";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/error.js";

// All routes
import productRoutes from "./routes/product.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path:"backend/config/config.env"
});

connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended:true,
    limit:"10mb"
}));

app.set('query parser', 'extended');



// Handle uncaught exceptions

process.on("uncaughtException", (err) => {
    console.log(`Error ${err}`);
    console.log("Shutting down due to uncaugth expection");
    process.exit(1);
});


app.get("/", (req, res) => {
    res.json({
        message:"Shop ecomm"
    })
})

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

app.use(errorMiddleware);


// Start server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port1 ${process.env.PORT}`);
})
