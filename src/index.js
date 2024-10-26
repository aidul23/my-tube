require("dotenv").config({ path: "../.env" });
const { app } = require("./app");
const connectDB = require("./db/config");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`✔️  server is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`❌  Mongodb connection failed!!`, error);
  });

//We can also connect db this way
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.error("ERROR: ", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("ERROR: ", error);
//     throw error;
//   }
// })();
