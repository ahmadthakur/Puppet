const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lick")
    .setDescription("Responds with a licking gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to lick")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime lick", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      interaction.reply(
        `${interaction.user} licked ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
