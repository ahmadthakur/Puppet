const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const nanospinner = require("nanospinner");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsRoot = path.join(__dirname, "..", "..", "commands");

    // reset arrays to avoid duplicates on redeploy
    client.commandsArray = [];

    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
          // skip legacy/removed music commands folder
          if (ent.name === "music") continue;
          walk(full);
        } else if (ent.isFile() && ent.name.endsWith(".js")) {
          try {
            const rel = path.relative(commandsRoot, full);
            const reqPath = path.join(commandsRoot, rel);
            // require the command module
            const command = require(reqPath);
            if (!command || !command.data) continue;
            client.commands.set(command.data.name, command);
            client.commandsArray.push(command.data.toJSON());
          } catch (e) {
            console.warn(`Failed to load command file ${full}:`, e.message || e);
          }
        }
      }
    };

    // walk and load commands
    try {
      if (fs.existsSync(commandsRoot)) walk(commandsRoot);
    } catch (e) {
      console.error("Error while loading commands:", e.message || e);
    }

    const token = process.env.DISCORD_BOT_TOKEN;
    const clientId = process.env.CLIENT_ID;

    if (!token) {
      console.error("DISCORD_BOT_TOKEN is not set; cannot deploy commands.");
      return;
    }

    if (!clientId) {
      console.error("CLIENT_ID is not set; cannot deploy commands.");
      return;
    }

    const rest = new REST({ version: "10" }).setToken(token);

    // deploy the commands
    (async () => {
      const spinner = nanospinner.createSpinner("Deploying commands").start();
      try {
        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandsArray,
        });
        spinner.success({ text: "Successfully deployed commands" });
      } catch (error) {
        spinner.error({ text: "Failed to deploy commands" });
        console.error(error);
      }
    })();
  };
};
