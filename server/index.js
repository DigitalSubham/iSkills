const express = require("express");
const databaseToServerConnection = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");

require("dotenv").config();

const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
const paymentRoute = require("./routes/paymentRoute");
const courseRoute = require("./routes/courseRoute");
const contactRoute = require("./routes/contactRoute");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" })); // If you plan to handle file uploads

// Database and Cloudinary connections
databaseToServerConnection();
cloudinaryConnect();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Update with your front-end origin
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/reach", contactRoute);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: `Your server is up and running`,
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
