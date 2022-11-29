const {SlashCommandBuilder} = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Rolls a dice."),
  async execute(interaction) {
    const dice = Math.floor(Math.random() * 6) + 1;
    const embed = new EmbedBuilder()
      .setTitle("Dice")
      .setDescription(`You rolled a ${dice}`)
      .setColor("Random");
    await interaction.reply({ embeds: [embed] });
  },
};
