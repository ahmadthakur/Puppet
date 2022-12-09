const colors = require("colors");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "currently under development", type: "WATCHING" }],
      status: "online",
    });

    client.on("error", (error) => {
      console.log(colors.red("[Bot Status]; Bot is offline"));
      console.log(colors.magenta(error));
    });
    console.log(colors.green("[Bot Status]; Bot is online"));
  },
};
