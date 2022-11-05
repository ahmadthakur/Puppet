const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stomp")
    .setDescription("Responds with stomping gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to stomp on")
        .setRequired(true)
    ),
  async execute(interaction) {
    await tenor.Search.Query("anime stomp on someone", "10").then((Results) => {
      const response = Results[Math.floor(Math.random() * Results.length)].url;

      interaction.reply(
        `${interaction.user} stomps on ${interaction.options.getUser(
          "user"
        )} ${response}`
      );
    });
  },
};
