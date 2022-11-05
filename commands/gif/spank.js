const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spank")
    .setDescription("Responds with a spanking gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to spank")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime spank", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      interaction.reply(
        `${interaction.user} spanked ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
