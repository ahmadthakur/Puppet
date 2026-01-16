const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin."),
  async execute(interaction) {
    const coin = ["Heads", "Tails"];
    const result = coin[Math.floor(Math.random() * coin.length)];

    const emojiMap = { Heads: "👍", Tails: "👎" };
    const emoji = emojiMap[result] || "🪙";

    const embed = new EmbedBuilder()
      .setTitle(`Coin Flip ${emoji}`)
      .setDescription(`The coin landed on ${emoji} ${result}`)
      .setColor(0x3498db);

    await interaction.reply({ embeds: [embed] });
  },
};
