const { SlashCommandBuilder, userMention } = require("discord.js");
const roasts = require("../../data/kill.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("Responds with a killing joke.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to kill")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = roasts[Math.floor(Math.random() * roasts.length)];

    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `${response
        .replace(/\$mention/g, `${interaction.options.getUser("user")}`)
        .replace(/\$author/g, `${interaction.user}`)}`
    );
  },
};
