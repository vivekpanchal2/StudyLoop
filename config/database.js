const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL) // Removed the deprecated options
    .then(() => console.log("Database connected"))
    .catch((error) => {
      console.log("Database connection error:", error);
      process.exit(1);
    });
};
