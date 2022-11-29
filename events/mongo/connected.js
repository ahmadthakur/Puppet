const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  name: "connected",
  once: true,
  async execute() {
    main().catch((err) => console.log(err));
    console.log("[Database Status]; Connected to database");
  },
};

async function main() {
  await mongoose.connect(process.env.DATABASE_TOKEN);
}
