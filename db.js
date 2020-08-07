const mongoose = require("mongoose");
const tunnel = require("tunnel-ssh");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

const mongoURI = config.mongoURI;

const connectDB = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected...!"))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = async () => {
  // CONNECTION EVENTS
  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(1);
    });
  });

  if (env === "development") {
    connectDB();
  } else {
    const sshConfig = {
      username: config.tunnelUsername,
      password: config.tunnelPassword,
      port: config.tunnelPort,
      dstPort: config.tunnelDBPort,
      host: config.tunnelHost,
    };

    tunnel(sshConfig, (err, server) => {
      if (err) console.log("SSH Connection Error", err);

      connectDB();
    });
  }
};
