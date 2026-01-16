const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Rolls a dice."),
  async execute(interaction) {
    const dice = Math.floor(Math.random() * 6) + 1;

    const rollingEmoji = "🎲";
    const faces = {
      1: "⚀",
      2: "⚁",
      3: "⚂",
      4: "⚃",
      5: "⚄",
      6: "⚅",
    };

    // send initial embed with rolling text (uses emoji instead of gif)
    const embed = new EmbedBuilder()
      .setTitle("Dice Roll")
      .setDescription(`${rollingEmoji} Rolling a dice...`)
      .setColor(0x3498db);
    await interaction.reply({ embeds: [embed] });

    // After a short delay, edit with the result emoji
    setTimeout(() => {
      embed
        .setDescription(`You rolled ${faces[dice]} ${dice}`)
        .setTitle(`Dice Roll ${faces[dice]}`);
      interaction.editReply({ embeds: [embed] });
    }, 1200);
  },
};
