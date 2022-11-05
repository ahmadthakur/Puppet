const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stab")
    .setDescription("Responds with a stabbing gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to stab")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime stab", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      interaction.reply(
        `${interaction.user} stabbed ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
