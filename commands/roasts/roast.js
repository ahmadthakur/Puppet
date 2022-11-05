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

    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `${interaction.options.getUser("user")} ${response}`
    );
  },
};
