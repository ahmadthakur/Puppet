const { SlashCommandBuilder } = require("discord.js");
const { Client } = require("discord.js");
const client = new Client({ intents: 32767 });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply(
      `Pong! \API Latency: ${client.ws.ping}ms\ Client Latency: ${
        Date.now() - interaction.createdTimestamp
      }ms`
    );
  },
};
