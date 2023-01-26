const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Responds with a quote."),
  async execute(interaction) {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    const quote = data[0]["q"];
    const author = data[0]["a"];
    const embed = new EmbedBuilder()
      .setTitle("Quote")
      .setDescription(`${quote}`)
      .addFields({ name: "Author", value: `${author}` })
      .setColor("Random")
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
