const mongoose = require("mongoose");

const app = require("./app");
// 49Dyo67Mh0reca3m
const DB_HOST =
  "mongodb+srv://Tatiana:49Dyo67Mh0reca3m@cluster0.qwpsn2z.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    const PORT = 3000;
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
