const colors = require("colors");

module.exports = {
  name: "error",
  once: true,
  execute(error) {
    //database error
    console.log(colors.red("[Database]; Error"));
    console.log(colors.magenta(error));
  },
};
