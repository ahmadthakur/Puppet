const colors = require("colors");

module.exports = {
  name: "error",
  execute(error) {
    //database error
    console.log(colors.red("Error"));
    console.log(colors.magenta(error));
  },
};
