const { SlashCommandBuilder, userMention } = require("discord.js");
const roasts = require("../../data/roasts.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roast")
    .setDescription("Responds with a roast.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to roast")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = roasts[Math.floor(Math.random() * roasts.length)];

    await interaction.reply(
      `${interaction.options.getUser("user")} ${response}`
    );
  },
};
