const colors = require("colors");

module.exports = {
  name: "connected",
  once: true,
  execute() {
    console.log(colors.green("[Database]; Connected to database"));
  },
};
