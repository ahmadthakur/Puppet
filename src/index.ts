import { Client, Collection } from "discord.js"; // Require the necessary discord.js classes

import { Player } from "discord-player"; // Require the discord-player package

require("dotenv").config(); // Require the dotenv package

declare module "discord.js" {
  interface Client {
    commands: Collection<string, any>;
    buttons: Collection<string, any>;
    player: Player;
    commandsArray: any;
    handleEvents: () => void;
    handleCommands: () => void;
    handleComponents: () => void;
  }
}

const client = new Client({ intents: 32767 }); // Create a new client instance

client.player = new Player(client); // Create a new Player
client.player.extractors.loadDefault(); // Load the default extractors

const fs = require("node:fs"); // Require the fs package

client.commands = new Collection(); // Create a new commands collection
client.buttons = new Collection(); // Create a new buttons collection
client.commandsArray = []; // Create a new commands array

// Require the functions folder
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file: string) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Call the functions
client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(process.env.TOKEN); // Login to Discord with your client's token
