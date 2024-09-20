const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch((error) => {
      console.log("Database connection error:", error);
      process.exit(1);
    });
};
