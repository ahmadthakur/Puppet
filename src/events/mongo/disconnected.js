const colors = require("colors");

module.exports = {
  name: "disconnected",
  once: true,
  execute() {
    console.log(colors.green("[Database]; Disconnected from database"));
  },
};
