const {SlashCommandBuilder} = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin."),
  async execute(interaction) {
    const coin = ["Heads", "Tails"];
    const result = coin[Math.floor(Math.random() * coin.length)];
    const embed = new EmbedBuilder()
      .setTitle("Coinflip")
      .setDescription(`The coin landed on ${result}`)
      .setColor("Random");
    await interaction.reply({ embeds: [embed] });
  },
};
