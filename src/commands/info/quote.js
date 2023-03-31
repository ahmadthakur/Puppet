const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Responds with a quote."),
  async execute(interaction) {
    axios.get(`https://zenquotes.io/api/random`).then((response) => {
      const data = response.data;
      const quote = data[0]["q"];
      const author = data[0]["a"];

      interaction.reply(`> ${quote} - ${author}`);
    });
  },
};
