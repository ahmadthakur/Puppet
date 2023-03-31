const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
//require axios
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bite")
    .setDescription("Responds with a biting gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to bite")
        .setRequired(true)
    ),
  async execute(interaction) {
    axios
      .get(
        `https://tenor.googleapis.com/v2/search?q=anime bite gif&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10&contentfilter=high`
      )
      .then((response) => {
        const data = response.data;
        const post =
          data.results[Math.floor(Math.random() * data.results.length)];

        const embed = new EmbedBuilder()
          .setImage(post.media_formats.gif.url)
          .setColor("Random");
        interaction.reply({
          content: `<@${interaction.user.id}> bites <@${
            interaction.options.getUser("user").id
          }>`,
          embeds: [embed],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
