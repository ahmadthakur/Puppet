const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flips a coin."),
  async execute(interaction) {
    const coin = ["Heads", "Tails"];
    const result = coin[Math.floor(Math.random() * coin.length)];

    const coinFace = new AttachmentBuilder(`./src/assets/coin/${result}.png`);

    const embed = new EmbedBuilder()
      .setTitle("Coin Flip")
      .setThumbnail(`attachment://${result}.png`)
      .setDescription(`The coin landed on ${result}`)
      .setColor("Random");
    await interaction.reply({ embeds: [embed], files: [coinFace] });
  },
};
