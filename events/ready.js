module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "currently under development" }],
      status: "online",
    });
    console.log("[Bot Status]; Bot is online");
  },
};
