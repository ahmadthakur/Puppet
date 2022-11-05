const { SlashCommandBuilder, userMention } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wave")
    .setDescription("Responds with waving gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to wave at")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime wave", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      // interaction.user is the object representing the User who ran the command
      // interaction.member is the GuildMember object, which represents the user in the specific guild

      interaction.reply(
        `${interaction.user} waves at ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
