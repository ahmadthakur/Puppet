const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Responds with a kissing gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to kiss")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime kiss", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      interaction.reply(
        `${interaction.user} kissed ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
