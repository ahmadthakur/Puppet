const { Client, Collection, GatewayIntentBits, ChannelType } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Simplified robot: no music player included

const fs = require("node:fs");

client.commands = new Collection();
client.buttons = new Collection();
client.commandsArray = [];

// Require the functions folder
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Initialize handlers immediately (no async wait needed)
console.log("Initializing handlers...");
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
