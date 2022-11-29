// Require the necessary discord.js classes
require("dotenv").config();
const fs = require("node:fs");
const dotenv = require("dotenv");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  ActionRowBuilder,
} = require("discord.js");
const mongoose = require("mongoose");

const client = new Client({ intents: 32767 });

//Slash Commands Handler with subfolders support
client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

//Events handler with subfolders support
client.events = new Collection();
const eventsFolders = fs.readdirSync("./events");
for (const folder of eventsFolders) {
  const eventFiles = fs
    .readdirSync(`./events/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(`./events/${folder}/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

//Components handler with subfolders support
client.components = new Collection();
const componentFolders = fs.readdirSync("./components");
for (const folder of componentFolders) {
  const componentFiles = fs
    .readdirSync(`./components/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of componentFiles) {
    const component = require(`./components/${folder}/${file}`);
    client.components.set(component.data.name, component);
  }
}

client.login(process.env.TOKEN);
(async () => {
  await mongoose.connect(`${process.env.DATABASE_TOKEN}`).catch(console.error);
})();
