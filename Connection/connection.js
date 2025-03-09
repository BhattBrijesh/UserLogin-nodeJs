const mongoose = require("mongoose");

async function handleDbConnection(url) {
  return await mongoose
    .connect(url)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => console.log("DB Connection Failed", error.message));
}
module.exports = { handleDbConnection };
