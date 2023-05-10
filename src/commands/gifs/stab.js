const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");

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
    axios
      .get(
        `https://tenor.googleapis.com/v2/search?q=anime-stab-gifs&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10`
      )
      .then(async (response) => {
        const data = await response.data;
        const post =
          data.results[Math.floor(Math.random() * data.results.length)];

        const embed = new EmbedBuilder()
          .setImage(post.media_formats.gif.url)
          .setColor("Random");
        interaction.reply({
          content: `<@${interaction.user.id}> stabs <@${
            interaction.options.getUser("user").id
          }>`,
          embeds: [embed],
        });
      });
  },
};
