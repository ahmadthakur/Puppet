// Require the necessary discord.js classes
const { Client, Collection } = require("discord.js");

// Require the discord-player package
const { Player } = require("discord-player");

// Require the dotenv package
require("dotenv").config();

// Create a new client instance
const client = new Client({ intents: 32767 });

// Create a new Player
client.player = new Player(client);
client.player.extractors.loadDefault();

// Require the fs package
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

// Call the functions
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Login to Discord with your client's token
client.login(process.env.TOKEN);
