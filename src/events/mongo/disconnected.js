const colors = require("colors");

module.exports = {
  name: "disconnected",
  execute() {
    console.log(colors.green("[Database]; Disconnected from database"));
  },
};
