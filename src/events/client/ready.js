const colors = require("colors");

module.exports = {
  name: "ready",
  execute(client) {
    client.on("error", (error) => {
      console.log(colors.red("[Bot Status]; Bot is offline"));
      console.log(colors.magenta(error));
    });
    console.log(colors.green("[Bot Status]; Bot is online"));
  },
};
