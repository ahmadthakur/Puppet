// Description: This event will run when the bot is ready.
// Requirements: colors
const colors = require("colors");

// Export the event
module.exports = {
  name: "ready",
  execute(client) {
    client.on("error", (error) => {
      console.log(colors.bgBlack("[Bot Status]; Bot is offline"));
      console.log(colors.bgRed(error));
    });
    console.log(colors.bgGreen("[Bot Status]; Bot is online"));
  },
};
