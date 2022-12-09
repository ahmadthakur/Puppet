const colors = require("colors");

module.exports = {
  name: "connecting",
  once: true,
  execute() {
    console.log(colors.cyan("[Database]; Connecting to database..."));
  },
};
