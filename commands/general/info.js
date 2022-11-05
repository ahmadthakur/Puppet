const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Responds with information about the bot."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Info")
      .setDescription("This bot was created by Sushi")
      .addFields({ name: "GitHub", value: "https://github.com/Sushipie" })
      .setColor("Random")
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
