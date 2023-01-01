const colors = require("colors");

module.exports = {
  name: "connecting",
  execute() {
    console.log(colors.cyan("[Database]; Connecting to database..."));
  },
};
