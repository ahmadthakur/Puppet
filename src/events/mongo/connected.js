const colors = require("colors");

module.exports = {
  name: "connected",
  execute() {
    console.log(colors.green("[Database]; Connected to database"));
  },
};
