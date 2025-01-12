const { Client, Collection, GatewayIntentBits  } = require("discord.js"); // Require the necessary discord.js classes

const { Player } = require("discord-player"); // Require the discord-player package

require("dotenv").config(); // Require the dotenv package

const client = new Client({
  intents: [32767, GatewayIntentBits.MessageContent]

}); // Create a new client instance


// Create a new Player
client.player = new Player(client);
client.player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

const ffmpeg = require('@ffmpeg-installer/ffmpeg');



const fs = require("node:fs"); // Require the fs package

client.commands = new Collection(); // Create a new commands collection
client.buttons = new Collection(); // Create a new buttons collection
client.commandsArray = []; // Create a new commands array

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
client.login(process.env.DISCORD_BOT_TOKEN);
console.log(ffmpeg.path);