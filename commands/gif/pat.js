const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("Responds with a petting gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to pet")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime pat", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      interaction.reply(
        `${interaction.user} has pat ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
