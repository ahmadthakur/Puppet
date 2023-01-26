const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inspire")
    .setDescription("Responds with an inspirational image."),
  async execute(interaction) {
    const response = await fetch("https://inspirobot.me/api?generate=true");
    const data = await response.text();
    const embed = new EmbedBuilder()
      .setImage(data)
      .setColor("Random")
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
