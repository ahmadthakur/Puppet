require("dotenv").config();
const fs = require("node:fs");
const mongoose = require("mongoose");
const { Client, Collection } = require("discord.js");

const client = new Client({ intents: 32767 });

const { Player } = require("discord-player");
const player = new Player(client)//   leaveOnEmpty: false, // This options are optional.
// });
// You can define the Player as *client.player* to easily access it.
client.player = player;

client.commands = new Collection();
client.buttons = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(process.env.TOKEN);
(async () => {
  await mongoose.connect(`${process.env.DATABASE_TOKEN}`).catch(console.error);
})();
