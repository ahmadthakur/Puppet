const { SlashCommandBuilder, userMention } = require("discord.js");
const roasts = require("../../data/urduRoasts.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("urduroast")
    .setDescription("Responds with a roast in urdu.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to roast in urdu")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = roasts[Math.floor(Math.random() * roasts.length)];

    await interaction.reply(
      `${interaction.options.getUser("user")} ${response}`
    );
  },
};
